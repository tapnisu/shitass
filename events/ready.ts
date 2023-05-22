import { ApplicationCommandPartial } from "../deps.ts";
import { Event } from "../types/mod.ts";

const event: Event = {
  name: "ready",
  run: (client) => {
    client.setPresence({ name: "Oh hi!", type: 0 });

    const commands = client.interactions.commands;

    client.commands.forEach((command) =>
      commands?.create(command as ApplicationCommandPartial)
    );

    console.log(`${client.user?.tag} is up!`);
  },
};

export default event;
