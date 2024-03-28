import { AuthBindings } from "@refinedev/core";
import { IMap } from "@console/interfaces";
import { Ask } from "./ask";

const strategies: IMap<AuthBindings> = {};

export function get(engine: string): AuthBindings {
  if (!strategies[engine]) {
    if (engine === Ask.engine) strategies[engine] = new Ask();
  }
  return strategies[engine];
}
