import { IMap } from "@console/interfaces";

export const passport: IPassport = {
  strategy: import.meta.env.VITE_KANTHOR_PASSPORT_STRATEGY || "",
  username: import.meta.env.VITE_KANTHOR_PASSPORT_USERNAME || "",
  password: import.meta.env.VITE_KANTHOR_PASSPORT_PASSWORD || "",
  remember: Number(import.meta.env.VITE_KANTHOR_PASSPORT_REMEMBER || "") || 7,
  strategies: {
    ask: {
      name: import.meta.env.VITE_KANTHOR_PASSPORT_STRATEGIES_ASK_NAME || "",
    },
  },
};

export interface IPassport {
  strategy: string;
  username: string;
  password: string;
  remember: number;
  strategies: IMap<IStrategy>;
}

export interface IStrategy {
  name: string;
}
