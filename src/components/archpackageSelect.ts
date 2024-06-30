import { TaprisComponent } from "@framework/mod.ts";
import { ActionRowComponent, Embed } from "harmony/mod.ts";
import * as xeorarch from "xeorarch/mod.ts";

export default new TaprisComponent()
  .setCustomId(/archpackage_select/)
  .setRun(async (_client, interaction) => {
    const query = interaction.data.values?.[0];

    if (!query) return;

    const packages = (await xeorarch.Search.search(query)).slice(0, 10);

    const selectRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 3,
          customID: `archpackage_select`,
          options: packages.map((p) => {
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
          customID: `refresh_archpackage_${packages[0].name}`,
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
      .setTitle(packages[0].name)
      .setDescription(packages[0].desc)
      .setURL(packages[0].url)
      .setTimestamp(Date.parse(packages[0].updated.toString()))
      .setAuthor(packages[0].author?.toString())
      .setFields([
        {
          name: "Version",
          value: packages[0].version?.toString(),
          inline: true,
        },
        { name: "Type", value: packages[0].type, inline: true },
        { name: "Arch", value: packages[0].arch, inline: true },
        { name: "Base", value: packages[0].base, inline: true },
        {
          name: "Install",
          value: `\`${packages[0].install
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")}\``,
        },
      ]);

    return interaction.updateMessage({
      embeds: [embed],
      components: [selectRow, buttonsRow],
    });
  });
