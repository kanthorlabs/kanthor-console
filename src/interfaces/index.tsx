export interface IAnalyticsOverview {
  credentials_count: number;
  application_count: number;
  endpoint_count: number;
  rule_count: number;
}

export interface IAccount {
  sub: string;
  name: string;
  metadata: {
    avatar?: string;
    provider?: string;
    [name: string]: any;
  };
}

export interface IWorkspace {
  id: string;
  created_at: number;
  updated_at: number;
  owner_id: string;
  name: string;
  tier: string;
}

export interface IApplication {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
}

export interface IEndpoint {
  id: string;
  created_at: number;
  updated_at: number;
  app_id: string;
  name: string;
  method: HttpMethod;
  uri: string;
}

export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
}

export interface IEndpointRule {
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

export enum ConditionSource {
  TYPE = "type",
}

export interface IMessage {
  id: string;
  timestamp: number;
  tier: string;
  app_id: string;
  type: string;
  metadata: string;
  headers: string;
  body: string;
}

export interface IEndpointMessage {
  id: string;
  timestamp: number;
  tier: string;
  app_id: string;
  type: string;
  metadata: string;
  headers: string;
  body: string;

  request_count: number;
  request_latest_ts: number;
  response_count: number;
  response_latest_ts: number;
  success_id: string;

  requests: IRequest[];
  responses: IResponse[];
}

export interface IRequest {
  id: string;
  timestamp: number;
  ep_id: string;
  msg_id: string;
  app_id: string;
  type: string;
  metadata: string;
  headers: string;
  body: string;
  uri: string;
  method: string;
}

export interface IResponse {
  id: string;
  timestamp: number;
  ep_id: string;
  msg_id: string;
  app_id: string;
  type: string;
  metadata: string;
  headers: string;
  body: string;
  uri: string;
  status: number;
  error: string;
}
