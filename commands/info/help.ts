import { Command } from "../../types/mod.ts";
import { ApplicationCommandOptionBase, Embed } from "../../deps.ts";

const command: Command = {
  name: "help",
  description: "Get info about commands",
  options: [
    {
      name: "command",
      description: "Name of command to get info",
      type: 3,
      required: false,
    },
  ],
  run: (client, interaction) => {
    const request = interaction.options.find(
      (option) => option.name == "command",
    )?.value;

    if (request) {
      const command = client.commands.get(request);

      if (!command) {
        return interaction.reply({
          content: `${request} is not a valid command!`,
          ephemeral: true,
        });
      }

      const embed = new Embed()
        .setColor(client.env.BOT_COLOR)
        .setTitle(command.name);

      if (command.description) embed.setDescription(command.description);

      command.options?.forEach((option) => {
        embed.addFields({
          name: `${option.name}`,
          value: option.description ? option.description : "none",
          inline: true,
        });
      });

      return interaction.reply({ embeds: [embed] });
    }

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setDescription(`Server member: ${interaction.guild?.name}`);

    if (client.user) {
      embed
        .setTitle(client.user.username)
        .setThumbnail(client.user.avatarURL());
    }

    client.commands.forEach((command: Command) => {
      embed.addFields({
        name: `/${command.name} ${
          command.options
            ? command.options
              .map(
                (option: ApplicationCommandOptionBase) =>
                  `<${
                    option.required ? "" : ""
                  }${option.name} [${option.description}]>`,
              )
              .join(" ")
            : ""
        }`,
        value: command.description ? command.description : "...",
        inline: true,
      });
    });

    return interaction.reply({ embeds: [embed] });
  },
};

export default command;
