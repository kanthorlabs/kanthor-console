import { AuthBindings } from "@refinedev/core";
import { IMap } from "@console/interfaces";
import * as configs from "@console/configs";
import { Ask } from "./ask";

const strategies: IMap<AuthBindings> = {};

export function get(name: string): AuthBindings {
  if (!strategies[name]) {
    if (name === Ask.name) strategies[name] = new Ask();
  }
  return strategies[name];
}
