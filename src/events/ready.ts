import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";

export default new TaprisEvent<"ready">()
  .setName("ready")
  .setRun(async (client: TaprisClient) => {
    client.updatePresence();

    await client.interactions.commands.bulkEdit(
      client.commands.array().map((command) => command.json()),
    );

    console.info(`${client.user!.tag} is up!`);
  });
