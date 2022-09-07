import ExtendedClient from "../core.ts";
import { Command } from "../types/mod.ts";
import archpackage from "./api/archpackage.ts";
import help from "./info/help.ts";

const Register = (client: ExtendedClient, command: Command) => {
  client.commands.set(command.name, command);
};

export default (client: ExtendedClient) => {
  Register(client, archpackage);
  Register(client, help);
};
