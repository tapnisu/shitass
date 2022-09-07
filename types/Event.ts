import Client from "../core.ts";
import { ClientEvents } from "../deps.ts";

interface Run {
  (client: Client, ...args: eventArgs): void;
}

type eventArgs = ClientEvents[keyof ClientEvents];

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}
