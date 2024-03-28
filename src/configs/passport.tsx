import { IMap } from "@console/interfaces";

export const passport: IPassport = {
  engine: import.meta.env.VITE_KANTHOR_PASSPORT_ENGINE || "",
  username: import.meta.env.VITE_KANTHOR_PASSPORT_USERNAME || "",
  password: import.meta.env.VITE_KANTHOR_PASSPORT_PASSWORD || "",
  remember:
    Number(import.meta.env.VITE_KANTHOR_PASSPORT_REMEMBER || "") ||
    7 * 24 * 60 * 60,
  strategies: {
    ask: {
      strategy:
        import.meta.env.VITE_KANTHOR_PASSPORT_STRATEGIES_ASK_STRATEGY || "",
    },
  },
};

export interface IPassport {
  engine: string;
  username: string;
  password: string;
  remember: number;
  strategies: IMap<IStrategy>;
}

export interface IStrategy {
  strategy: string;
}
