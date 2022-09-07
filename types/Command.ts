import {
  ApplicationCommandOptionBase,
  Interaction,
  SlashCommandInteraction,
} from "../deps.ts";
import ExtendedClient from "../core.ts";

interface Run {
  (client: ExtendedClient, interaction: SlashCommandInteraction):
    | Promise<Interaction>
    | Promise<void>
    | void;
}

export interface Command {
  name: string;
  description?: string;
  options?: ApplicationCommandOptionBase[];
  run: Run;
}
