import { AuthBindings } from "@refinedev/core";
import * as configs from "@console/configs";
import * as factory from "./factory";

export const auth: AuthBindings = {
  login: async (params: any) => {
    return factory.get(configs.passport.engine).login(params);
  },
  logout: async (params: any) => {
    return factory.get(configs.passport.engine).logout(params);
  },
  check: async (params: any) => {
    return factory.get(configs.passport.engine).check(params);
  },
  onError: async (error) => {
    return factory.get(configs.passport.engine).onError(error);
  },
  getIdentity: async (params?: any) => {
    const fn = factory.get(configs.passport.engine).getIdentity;
    if (!fn) return null;

    return fn(params);
  },
};
