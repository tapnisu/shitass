import { CommandsCollection } from "@commands/mod.ts";
import { ComponentsCollection } from "@components/mod.ts";
import { EventsCollection } from "@events/mod.ts";
import { TaprisCommand, TaprisComponent, TaprisEvent } from "@framework/mod.ts";
import { Config } from "@utils/mod.ts";
import { Client, Collection } from "harmony/mod.ts";

export class TaprisClient extends Client {
  public commands: Collection<string, TaprisCommand>;
  public components: Collection<RegExp, TaprisComponent>;
  public events: Collection<string, TaprisEvent>;

  public botColor: string;
  public authorId: string;
  public serverPort: string;

  constructor(
    config: Config,
    commands: TaprisCommand[],
    events: TaprisEvent[],
    components: TaprisComponent[]
  ) {
    super();

    this.commands = new CommandsCollection(commands);
    this.components = new ComponentsCollection(components);
    this.events = new EventsCollection(events);

    this.botColor = config.botColor;
    this.authorId = config.authorId;

    this.token = config.token;
    this.serverPort = config.serverPort;

    this.events.array().forEach((event) =>
      // deno-lint-ignore no-explicit-any
      this.on(event.name, event.run.bind(null, this) as any)
    );
  }

  /**
   * Start bot
   */
  public async start() {
    await this.connect(this.token);
  }

  /**
   * Get amount of guilds
   * @returns Size of guild
   */
  public async getGuildsAmount(): Promise<number> {
    return await this.guilds.size();
  }

  /**
   * Updates presence
   */
  public updatePresence() {
    this.setPresence({
      name: "Oh, hi!",
      type: 0,
    });
  }
}
