import { Embed, xeorarch } from "../../deps.ts";
import { Command } from "../../types/mod.ts";

const command: Command = {
  name: "archpackage",
  description: "Search for arch packages",
  options: [
    {
      name: "query",
      description: "Query for search",
      type: 3,
      required: true,
    },
  ],
  run: async (_client, interaction) => {
    const query = interaction.options.find(
      (option) => option.name == "query"
    )?.value;

    const response = (await xeorarch.Search.search(query))[0];
    if (!response)
      return interaction.reply({
        content:
          "I can't find this package! Bruh, you should try to find it in the trash can.",
        ephemeral: true,
      });

    await interaction.defer();

    console.log(new Date(response.updated));

    const embed = new Embed()
      .setTitle(response.name)
      .setDescription(response.desc)
      .setURL(response.url)
      //.setTimestamp(new Date(response.updated).toISOString())
      .setAuthor(response.author?.toString())
      .setFields([
        { name: "Version", value: response.version?.toString(), inline: true },
        { name: "Type", value: response.type, inline: true },
        { name: "Arch", value: response.arch, inline: true },
        { name: "Base", value: response.base, inline: true },
        { name: "Install", value: `\`${response.install}\`` },
      ]);

    return interaction.reply({
      embeds: [embed],
    });
  },
};

export default command;
