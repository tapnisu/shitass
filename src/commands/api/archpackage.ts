import { TaprisCommand } from "@framework/mod.ts";
import {
  ActionRowComponent,
  ApplicationCommandOptionType,
  Embed,
} from "harmony/mod.ts";
import * as xeorarch from "xeorarch/mod.ts";

export default new TaprisCommand()
  .setName("archpackage")
  .setDescription("Search for arch packages")
  .setOptions({
    name: "query",
    description: "Query for search",
    type: ApplicationCommandOptionType.STRING,
    required: true,
  })
  .setRun(async (_client, interaction) => {
    await interaction.defer();

    const query = interaction.options.find((option) => option.name == "query")
      ?.value;

    const response = (await xeorarch.Search.search(query)).slice(0, 10);

    if (!response || response.length == 0) {
      return interaction.reply({
        content:
          "I can't find this package! You should try to find it in the trash can :D",
      });
    }

    const selectRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 3,
          customID: "archpackage_select",
          options: response.map((p) => {
            return {
              label: p.name,
              value: p.name,
              description: `${p.desc.slice(0, 100)}`,
            };
          }),
          placeholder: "Choose a package",
        },
      ],
    };

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          customID: `refresh_archpackage_${response[0].name}`,
          label: "Refresh",
          style: 2,
        },
        {
          type: 2,
          customID: "delete_message",
          label: "Delete",
          style: 4,
        },
      ],
    };

    const embed = new Embed()
      .setTitle(response[0].name)
      .setDescription(response[0].desc)
      .setURL(response[0].url)
      .setTimestamp(Date.parse(response[0].updated.toString()))
      .setAuthor(response[0].author?.toString())
      .setFields([
        {
          name: "Version",
          value: response[0].version?.toString(),
          inline: true,
        },
        { name: "Type", value: response[0].type, inline: true },
        { name: "Arch", value: response[0].arch, inline: true },
        { name: "Base", value: response[0].base, inline: true },
        { name: "Install", value: `\`${response[0].install}\`` },
      ]);

    return interaction.reply({
      embeds: [embed],
      components: [selectRow, buttonsRow],
    });
  });
