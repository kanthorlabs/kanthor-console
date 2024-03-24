import { IAuditable } from "./common";

export interface IWorkspace extends IAuditable {
  owner_id: string;
  name: string;
  tier: string;
}
