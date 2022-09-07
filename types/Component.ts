import Client from "../core.ts";
import { Interaction, MessageComponentInteraction } from "../deps.ts";

interface Run {
  (client: Client, interaction: MessageComponentInteraction):
    | Promise<Interaction>
    | Promise<void>
    | void;
}

export interface Component {
  customId: RegExp;
  run: Run;
}
