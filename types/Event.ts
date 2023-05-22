import Client from "../core.ts";
import { ClientEvents } from "../deps.ts";

interface Run {
  // deno-lint-ignore no-explicit-any
  (client: Client, ...args: any[]): void;
}

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}
