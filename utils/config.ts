import { load } from "../deps.ts";

interface Env {
  BOT_TOKEN: string;
  BOT_COLOR: string;
  SERVER_PORT: string;

  MODE: "DENODEPLOY" | string;
}

const getEnv = async (): Promise<Env> => {
  const env = (Deno.env.get("MODE") == "DENODEPLOY"
    ? Deno.env.toObject()
    : await load()) as unknown as Env;

  if (!env.BOT_COLOR) env.BOT_COLOR = "#000000";

  return env;
};

export const env = await getEnv();
