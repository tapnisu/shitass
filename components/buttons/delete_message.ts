import { Component } from "../../types/mod.ts";

const component: Component = {
  customId: /delete_message/,
  run: (_client, interaction) => {
    return interaction.message.delete();
  },
};

export default component;
