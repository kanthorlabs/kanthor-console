import { AuthBindings } from "@refinedev/core";
import * as configs from "@console/configs";
import * as factory from "./factory";
import { Ask } from "./ask";

export const auth: AuthBindings = {
  login: async (params: any) => {
    return factory.get(Ask.name).login(params);
  },
  logout: async (params: any) => {
    return factory.get(Ask.name).logout(params);
  },
  check: async (params: any) => {
    return factory.get(Ask.name).check(params);
  },
  onError: async (error) => {
    return factory.get(Ask.name).onError(error);
  },
  getIdentity: async (params?: any) => {
    const fn = factory.get(Ask.name).getIdentity;
    if (!fn) return null;

    return fn(params);
  },
};
