import { commands } from "@commands/mod.ts";
import { components } from "@components/mod.ts";
import { events } from "@events/mod.ts";
import { env, TaprisClient, TaprisCommand, TaprisEvent } from "./src/mod.ts";

if (import.meta.main) {
  await new TaprisClient(
    {
      token: env.BOT_TOKEN,
      botColor: env.BOT_COLOR,

      authorId: env.AUTHOR_ID,

      mode: env.MODE,
    },
    commands as TaprisCommand[],
    events as TaprisEvent[],
    components,
  ).start();
}

export * from "./src/mod.ts";
