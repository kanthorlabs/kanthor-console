import axios from "axios";
import uuid from "ui7";
import * as configs from "@console/configs";
import persistence from "@console/utils/persistence";
import {
  KEY_TENANT_ID,
  KEY_ACCOUNT_AUTHORIZATION,
} from "@console/providers/auth/constants";

const httpc = axios.create({ withCredentials: true });

httpc.interceptors.request.use(
  (config) => {
    config.headers.set("Idempotency-Key", uuid());

    config.headers.set("X-Authorization-Stategy", configs.passport.strategy);

    const { data: tenantId } = persistence.get<string>(KEY_TENANT_ID);
    if (tenantId) {
      config.headers.set("X-Authorization-Tenant", tenantId);
    }

    const { data: authorization } = persistence.get<string>(
      KEY_ACCOUNT_AUTHORIZATION
    );
    if (authorization) {
      config.headers.set("Authorization", authorization);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpc;
