import { Event } from "../types/mod.ts";
import { Embed, Guild } from "../deps.ts";

const event: Event = {
  name: "guildCreate",
  run: async (client, guild: Guild) => {
    console.log(`Joined ${guild.name} guild!`);

    if (!guild.systemChannelID || !client.user) return;
    const channel = await client.channels.get(guild.systemChannelID);
    if (!channel?.isText() || !channel) return;

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(client.user.username)
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `Type "/" to check bot commands!
        https://github.com/tapnisu/shitass.
        Developed by tapnisu#7384.`,
      );

    return channel.send({
      embeds: [embed],
    });
  },
};

export default event;
