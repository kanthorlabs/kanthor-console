export enum ConditionSource {
  TYPE = "type",
}

export interface IRoute {
  id: string;
  created_at: number;
  updated_at: number;
  ep_id: string;
  name: string;
  priority: number;
  exclusionary: boolean;
  condition_source: ConditionSource;
  condition_expression: string;
}
