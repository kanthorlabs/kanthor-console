import { IAuditable } from "./common";

export enum ConditionSource {
  TYPE = "type",
}

export interface IRoute extends IAuditable {
  ep_id: string;
  name: string;
  priority: number;
  exclusionary: boolean;
  condition_source: ConditionSource;
  condition_expression: string;
}
