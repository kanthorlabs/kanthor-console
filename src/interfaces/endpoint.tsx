import { IAuditable } from "./common";

export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
}

export interface IEndpoint extends IAuditable {
  app_id: string;
  name: string;
  method: HttpMethod;
  uri: string;
}
