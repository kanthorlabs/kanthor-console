export * from "./console";
export * from "./api";
export * from "./passport";

import projectjson from "./project.json";
export interface IProject {
  name: string;
  version: string;
}
export const project: IProject = projectjson as any;
