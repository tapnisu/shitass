import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";

export default new TaprisEvent<"reconnect">()
  .setName("reconnect")
  .setRun(async (client: TaprisClient) => {
    client.updatePresence();

    console.info(`${client.user?.tag} is reconnected!`);
  });
