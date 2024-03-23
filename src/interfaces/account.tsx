import { IMap } from "./common";

export interface IAccount {
  username: string;
  name: string;
  metadata?: IMap;
  created_at: number;
  updated_at: number;
  deactivated_at: number;
}
