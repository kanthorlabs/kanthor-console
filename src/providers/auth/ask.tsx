import { AuthBindings } from "@refinedev/core";
import {
  AuthActionResponse,
  CheckResponse,
  OnErrorResponse,
  IdentityResponse,
  PermissionResponse,
} from "@refinedev/core/dist/interfaces";

import * as configs from "@console/configs";
import httpc from "@console/utils/httpc";
import persistence, { withTtl } from "@console/utils/persistence";
import { IAccount, IMap } from "@console/interfaces";
import {
  KEY_ACCOUNT,
  KEY_ACCOUNT_AUTHORIZATION,
  KEY_TENANT_ID,
} from "./constants";

export class Ask implements Required<AuthBindings> {
  public static engine: string = "ask";

  public async login({
    email,
    password,
    remember,
  }: IMap): Promise<AuthActionResponse> {
    const authorization = `basic ${btoa(`${email}:${password}`)}`;
    const options = {
      headers: { Authorization: authorization },
    };

    const { account, error } = await httpc
      .get(`${configs.api.portal.uri}/api/account`, options)
      .then((r) => ({ account: r.data as IAccount, error: null }))
      .catch((error: Error) => ({ account: null, error }));

    if (error) {
      return { success: false, error };
    }

    // if user select remember me, set it to X days (configured in configs.passport.remember)
    // otherwise use default setting
    const ttlopts = withTtl(Number(remember) * configs.passport.remember);
    persistence.set(KEY_ACCOUNT, account, ttlopts);
    persistence.set(KEY_ACCOUNT_AUTHORIZATION, authorization, ttlopts);
    return {
      success: true,
      successNotification: { message: `Welcome back ${account.name}` },
    };
  }

  public async logout(params: any): Promise<AuthActionResponse> {
    persistence.del(KEY_ACCOUNT);
    persistence.del(KEY_ACCOUNT_AUTHORIZATION);
    persistence.del(KEY_TENANT_ID);
    return {
      success: true,
    };
  }

  public async check(params?: any): Promise<CheckResponse> {
    const { data: authorization, error: err } = persistence.get<string>(
      KEY_ACCOUNT_AUTHORIZATION
    );
    if (err) return { authenticated: false, logout: true };

    const options = {
      headers: { Authorization: authorization },
    };
    const error = await httpc
      .get(`${configs.api.portal.uri}/api/account`, options)
      .then((r) => undefined)
      .catch((error: Error) => error);

    return { authenticated: !error, error, logout: !!error };
  }

  public async onError(error: any): Promise<OnErrorResponse> {
    return { error };
  }

  public async getIdentity(params?: any): Promise<IdentityResponse> {
    const { data: account, error } = persistence.get<IAccount>(KEY_ACCOUNT);

    if (error) throw error;
    return account;
  }

  public async getPermissions(
    params?: Record<string, any>
  ): Promise<PermissionResponse> {
    return null;
  }

  public async updatePassword(params: any): Promise<AuthActionResponse> {
    return { success: false };
  }

  public async forgotPassword(params: any): Promise<AuthActionResponse> {
    return { success: false };
  }

  public async register(params: any): Promise<AuthActionResponse> {
    return { success: false };
  }
}
