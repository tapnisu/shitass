import ExtendedClient from "../core.ts";
import { Event } from "../types/mod.ts";
import ready from "./ready.ts";
import interactionCreate from "./interactionCreate.ts";
import messageCreate from "./messageCreate.ts";
import guildCreate from "./guildCreate.ts";

const Register = (client: ExtendedClient, event: Event) => {
  client.events.set(event.name, event);
  client.on(event.name, event.run.bind(null, client));
};

export default (client: ExtendedClient) => {
  Register(client, ready);
  Register(client, interactionCreate);
  Register(client, messageCreate);
  Register(client, guildCreate);
};
