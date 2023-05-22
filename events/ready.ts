import { Event } from "../types/mod.ts";

const event: Event = {
  name: "ready",
  run: (client) => {
    client.setPresence({ name: "Oh hi!", type: 0 });

    client.interactions.commands.bulkEdit(client.commands.array());

    console.log(`${client.user?.tag} is up!`);
  },
};

export default event;
