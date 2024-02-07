import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import _ from "lodash";
import { AuthBindings, useParsed, OAuthProvider } from "@refinedev/core";
import {
  AuthActionResponse,
  CheckResponse,
  OnErrorResponse,
  PermissionResponse,
  IdentityResponse,
} from "@refinedev/core/dist/interfaces";
import { GithubOutlined } from "@ant-design/icons";
import {
  FrontendApi,
  Configuration,
  UiNodeInputAttributes,
  Session,
} from "@ory/client";
import { IAccount } from "../interfaces";
import httpClient from "../http-client";
import configs from "../configs";

const AUTH_ENGINE_KEY = "kanthor.auth.engine";
export const providers: OAuthProvider[] = [
  {
    name: "github",
    icon: <GithubOutlined />,
    label: "Sign in with GitHub",
  },
];

export const useAuthProvider = () => {
  const { params } = useParsed<{ auth_engine?: string; to: string }>();
  const to = params?.to || "/";

  const [provider, setProvider] = useState<AuthBindings>();

  useEffect(() => {
    const isAsk =
      localStorage.getItem(AUTH_ENGINE_KEY) === AskAuthProvider.engine ||
      (params?.auth_engine || configs.api.auth.engine) ===
        AskAuthProvider.engine;
    if (isAsk) {
      httpClient.defaults.headers.common = {
        ...httpClient.defaults.headers.common,
        "X-Authorization-Engine": AskAuthProvider.engine,
      };

      setProvider(new AskAuthProvider(to));
      return;
    }

    httpClient.defaults.headers.common = {
      ...httpClient.defaults.headers.common,
      "X-Authorization-Engine": ExternalAuthProvider.engine,
    };
    setProvider(
      new ExternalAuthProvider(
        to,
        providers.map((p) => p.name)
      )
    );
  }, []);

  if (!provider) return { authProvider: undefined };

  // with class we will lose the lexical scope of refine
  // need to bind each method to new object
  const authProvider: AuthBindings = {
    login: provider.login.bind(provider),
    logout: provider.logout.bind(provider),
    check: provider.check.bind(provider),
    onError: provider.onError.bind(provider),
    getPermissions: provider.getPermissions?.bind(provider),
    getIdentity: provider.getIdentity?.bind(provider),
  };

  return { authProvider };
};

export class AskAuthProvider implements AuthBindings {
  public static readonly engine = "ask";

  private readonly key: string = "kanthor.account";
  private readonly in: string = "/";
  private readonly out: string = "/auth/login";
  private account: IAccount | null = null;

  constructor(to: string) {
    this.in = to ?? this.in;
  }

  public async login(params: {
    email: string;
    password: string;
  }): Promise<AuthActionResponse> {
    localStorage.setItem(AUTH_ENGINE_KEY, AskAuthProvider.engine);

    try {
      httpClient.defaults.headers.common = {
        ...httpClient.defaults.headers.common,
        Authorization: `Basic ${btoa(`${params.email}:${params.password}`)}`,
      };

      const url = new URL("/api/account", configs.api.auth.ask.uri);
      const response = await httpClient.get<{ account: IAccount }>(
        url.toString()
      );

      const account = response.data.account;
      account.metadata["Authorization"] =
        httpClient.defaults.headers.common["Authorization"];

      localStorage.setItem(this.key, JSON.stringify(account));

      this.account = account;
      return { success: true, redirectTo: this.in };
    } catch {
      this.cleanup();
      return { success: false };
    }
  }

  public async logout(params: any): Promise<AuthActionResponse> {
    this.cleanup();
    localStorage.removeItem(this.key);
    return { success: true, redirectTo: this.out };
  }

  public async check(params?: any): Promise<CheckResponse> {
    const hash = localStorage.getItem(this.key);
    if (!hash) {
      return { authenticated: false, redirectTo: this.out, logout: true };
    }

    try {
      const account = JSON.parse(hash);
      httpClient.defaults.headers.common = {
        ...httpClient.defaults.headers.common,
        Authorization: account.metadata["Authorization"],
      };

      const url = new URL("/api/account", configs.api.portal.uri);
      await httpClient.get<{ account: IAccount }>(url.toString());

      this.account = account;
      return { authenticated: true, redirectTo: window.location.href };
    } catch {
      this.cleanup();
      return {
        authenticated: false,
        redirectTo: this.out,
        logout: true,
        error: new Error("unknown account"),
      };
    }
  }

  public async onError(error: any): Promise<OnErrorResponse> {
    this.cleanup();

    return { error };
  }

  public async getPermissions(params?: any): Promise<PermissionResponse> {
    return null;
  }

  public async getIdentity(params?: any): Promise<IdentityResponse> {
    if (this.account) return this.account;

    const checked = await this.check(params);
    if (!checked.authenticated) throw new Error("unauthorized");

    return this.account;
  }

  private cleanup() {
    localStorage.removeItem(AUTH_ENGINE_KEY);
  }
}

export class ExternalAuthProvider implements AuthBindings {
  public static readonly engine = "external";

  private account: IAccount | null = null;
  private readonly in: string = "/";
  private readonly out: string = "/auth/login";
  private readonly ory: FrontendApi;
  private readonly providers: {
    [name: string]: { login_url: string; logout_url: string };
  };

  constructor(to: string, providers: string[]) {
    this.in = to ?? this.in;

    this.providers = providers.reduce(
      (m, p) => ({ ...m, [p]: { login_url: "", logout_url: "" } }),
      {}
    );
    this.ory = new FrontendApi(
      new Configuration({
        basePath: configs.api.auth.external.uri,
        baseOptions: { withCredentials: true },
      })
    );
  }

  public async login(params: {
    providerName: string;
  }): Promise<AuthActionResponse> {
    localStorage.setItem(AUTH_ENGINE_KEY, AskAuthProvider.engine);
    const provider = params.providerName;

    try {
      if (!this.providers[provider]?.login_url) {
        await this.configLogin(provider);
      }

      window.location.replace(this.providers[provider].login_url);
      return { success: true };
    } catch (error: any) {
      this.cleanup();

      return { success: false, error };
    }
  }

  public async logout(params: any): Promise<AuthActionResponse> {
    this.cleanup();
    const provider = params?.providerName || this.account?.metadata.provider;
    if (!provider) {
      return {
        success: false,
        error: new Error(
          "Unable to clear cookie and session. Please clear your browser cookie and session manaully!"
        ),
      };
    }

    try {
      if (!this.providers[provider]?.logout_url) {
        await this.configLogout(provider);
      }

      window.location.replace(this.providers[provider].logout_url);

      return { success: true };
    } catch (error: any) {
      this.cleanup();

      return { success: false, error };
    }
  }

  public async check(params?: any): Promise<CheckResponse> {
    try {
      const { data: session } = await this.ory.toSession();
      this.account = this.session2account(session);

      await Promise.all(
        Object.keys(this.providers).map(this.configLogout.bind(this))
      );
      return { authenticated: true, redirectTo: this.in };
    } catch {
      this.cleanup();
      await Promise.all(
        Object.keys(this.providers).map(this.configLogin.bind(this))
      );
      return {
        authenticated: false,
        redirectTo: this.out,
        logout: true,
        error: new Error("unknown account"),
      };
    }
  }

  public async onError(error: any): Promise<OnErrorResponse> {
    return { error };
  }

  public async getPermissions(params?: any): Promise<PermissionResponse> {
    return null;
  }

  public async getIdentity(params?: any): Promise<IdentityResponse> {
    if (this.account) return this.account;

    const checked = await this.check(params);
    if (!checked.authenticated) throw new Error("unauthorized");

    return this.account;
  }

  private session2account(session: Session): IAccount {
    if (!session.identity?.id) throw new Error("unknown account identity");

    return {
      sub: session.identity.id,
      name:
        session.identity.traits["username"] || session.identity.traits["email"],
      metadata: {
        avatar: _.get(session, "session.identity.metadata_publi.avatar"),
        provider: session.authentication_methods?.find(
          (m) => m.method === "oidc"
        )?.provider,
      },
    };
  }

  private cleanup() {
    localStorage.removeItem(AUTH_ENGINE_KEY);
  }

  private async configLogin(provider: string): Promise<boolean> {
    const { data: flow } = await this.ory.createBrowserLoginFlow({
      refresh: true,
    });

    const csrf: UiNodeInputAttributes | undefined = flow.ui.nodes.find(
      (node) =>
        node.group === "default" &&
        node.attributes.node_type === "input" &&
        node.attributes.name === "csrf_token"
    ) as any;
    if (!csrf) throw new Error("Csrf token was not found");

    // by using this method we are going to get the error 422 Unprocessable Content
    // catch that error and redirect to the next destination to complete login process
    const { to } = await this.ory
      .updateLoginFlow({
        flow: flow.id,
        updateLoginFlowBody: {
          method: "oidc",
          csrf_token: csrf.value,
          provider,
        },
      })
      .then(() => ({ to: "" }))
      .catch((err: AxiosError) => {
        // 422 Unprocessable Content
        if (err.response?.status === 422) {
          const to = (err.response.data as any).redirect_browser_to;
          return { to };
        }
        return { to: "" };
      });
    if (to) {
      this.providers[provider].login_url = to;
      return true;
    }

    return false;
  }

  private async configLogout(provider: string): Promise<boolean> {
    const { data: flow } = await this.ory.createBrowserLogoutFlow();
    if (flow.logout_url) {
      this.providers[provider].logout_url = flow.logout_url;
      return true;
    }
    return false;
  }
}
