const Levels = require("discord-xp");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'leaderboard',
  description: 'leaderboard',
  aliases: ['lb'],
  category: 'moderation',
  clientPermissions: [],
  userPermissions: [],
  run: async (client, msg, args) => {
    Levels.setURL(process.env.mongo_url);

    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1)
      return reply(
        "Nobody's in leaderboard yet. Be the first one to climb to the top!"
      );

    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    ); // We process the leaderboard.

    const lb = leaderboard.map(
      (e) => `${e.position}. ${e.username}  LVL ${e.level}`
    ); // We map the outputs.

    let lbEmbed = new MessageEmbed()
      .setColor('ORANGE')
      .setTitle(`${message.guild.name}'s leaderboard`)
      .addField(lb.join("\n\n"), `\u200b`);
    message.channel.send({ embeds: [lbEmbed] });
  },
};
