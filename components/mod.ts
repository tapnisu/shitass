import ExtendedClient from "../core.ts";
import { Component } from "../types/mod.ts";
import deleteMessage from "./buttons/delete_message.ts";
import refresh_archpackage from "./buttons/refresh_archpackage.ts";
import archpackage_select from "./select/archpackage_select.ts";

const Register = (client: ExtendedClient, component: Component) => {
  client.components.set(component.customId, component);
};

export default (client: ExtendedClient) => {
  Register(client, deleteMessage);
  Register(client, refresh_archpackage);
  Register(client, archpackage_select);
};
