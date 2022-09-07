import ExtendedClient from "../core.ts";
import { Component } from "../types/mod.ts";
import deleteMessage from "./buttons/delete_message.ts";

const Register = (client: ExtendedClient, component: Component) => {
  client.components.set(component.customId, component);
};

export default (client: ExtendedClient) => {
  Register(client, deleteMessage);
};
