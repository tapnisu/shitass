import { load } from "@std/dotenv";

export interface Env {
  BOT_TOKEN: string;
  BOT_COLOR: string;

  AUTHOR_ID: string;

  MODE: "production" | "development" | string;
}

export interface Config {
  token: string;
  botColor: string;

  authorId: string;

  mode: "production" | "development" | string;
}

export const getEnv = async (): Promise<Env> => {
  const env = ((Deno.env.get("MODE") as Env["MODE"]) === "production"
    ? Deno.env.toObject()
    : await load()) as unknown as Env;

  if (!env.BOT_COLOR) env.BOT_COLOR = "#000000";
  if (!env.AUTHOR_ID) env.AUTHOR_ID = "586128640136445964";

  return env;
};

export const env = await getEnv();
