import { commands } from "@commands/mod.ts";
import { components } from "@components/mod.ts";
import { events } from "@events/mod.ts";
import { TaprisClient, TaprisCommand, TaprisEvent, env } from "./src/mod.ts";

Deno.cron("ping", "* * * * *", () => {
  console.log("Ping!!!");
});

if (import.meta.main)
  await new TaprisClient(
    {
      token: env.BOT_TOKEN,
      botColor: env.BOT_COLOR,

      authorId: env.AUTHOR_ID,

      mode: env.MODE,
    },
    commands as TaprisCommand[],
    events as TaprisEvent[],
    components
  ).start();

export * from "./src/mod.ts";
