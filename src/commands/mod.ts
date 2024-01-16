import archpackage from "@commands/api/archpackage.ts";
import help from "@commands/info/help.ts";
import { TaprisCommand } from "@framework/mod.ts";
import { Collection } from "harmony/mod.ts";

export const commands = [help, archpackage];

/**
 * Create a collection of commands
 */
export class CommandsCollection extends Collection<string, TaprisCommand> {
  /**
   * Create a collection of commands
   * @param commands array of commands to set to collection
   */
  constructor(commands: TaprisCommand[]) {
    super();

    commands
      .filter((command) => !command.disabled)
      .forEach((command) => this.set(command.name, command));
  }
}
