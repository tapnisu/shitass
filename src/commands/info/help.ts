import { TaprisCommand } from "@framework/mod.ts";
import {
  ApplicationCommandOption,
  ApplicationCommandOptionBase,
  ApplicationCommandOptionType,
  Embed,
} from "harmony/mod.ts";

export default new TaprisCommand()
  .setName("help")
  .setDescription("Get info about commands")
  .setOptions({
    name: "command",
    description: "Name of command to get info",
    type: ApplicationCommandOptionType.STRING,
    required: false,
  })
  .setRun((client, interaction) => {
    const request: string = interaction.options.find(
      (option) => option.name == "command",
    )?.value;

    if (request) {
      const command = client.commands.get(request);

      if (!command) {
        return interaction.reply({
          embeds: [
            new Embed()
              .setColor(client.botColor)
              .setTitle(`${request} is not a valid command!`),
          ],
          ephemeral: true,
        });
      }

      const embed = new Embed()
        .setColor(client.botColor)
        .setTitle(command.name);

      if (command.description) embed.setDescription(command.description);

      command.options.forEach((option: ApplicationCommandOption) => {
        embed.addFields({
          name: option.name,
          value: option.description,
          inline: true,
        });
      });

      return interaction.reply({ embeds: [embed] });
    }

    const embed = new Embed()
      .setTitle(client.user!.username)
      .setThumbnail(client.user!.avatarURL())
      .setColor(client.botColor)
      .setDescription(
        interaction.guild?.name
          ? `Server member: ${interaction.guild?.name}`
          : "List of my commands",
      );

    client.commands.forEach((command: TaprisCommand) => {
      embed.addFields({
        name: `/${command.name} ${
          command.options
            ? Array.prototype.map
                .call(
                  command.options,
                  (option: ApplicationCommandOptionBase) =>
                    `<${option.required ? "(required) " : ""}${option.name} [${
                      option.description
                    }]>`,
                )
                .join(" ")
            : ""
        }`,
        value: command.description,
        inline: true,
      });
    });

    return interaction.reply({ embeds: [embed] });
  });
