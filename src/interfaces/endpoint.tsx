export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
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
