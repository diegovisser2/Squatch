const Levels = require("discord-xp");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'leaderboard',
  description: 'leaderboard',
  aliases: ['lb'],
  category: 'leveling',
  clientPermissions: [],
  userPermissions: [],
  run: async (client, msg, args) => {
    Levels.setURL(process.env.mongo_url);
    const embed = new MessageEmbed()
    .setTitle('Leaderboard')
    .setColor('BLUE')
    .setDescription("Nobody's in leaderboard yet. Be the first one to climb to the top!")
    const rawLeaderboard = await Levels.fetchLeaderboard(msg.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1)
      return reply({ embeds: [embed] });

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
      .setTitle(`${msg.guild.name}'s leaderboard`)
      .addField(lb.join("\n\n"), `\u200b`);
    msg.channel.send({ embeds: [lbEmbed] });
  },
};
