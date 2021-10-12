const Levels = require("discord-xp");
module.exports = {
  name: 'setlevel',
  description: 'sets a level for the selected user',
  aliases: ['set level'],
  category: 'leveling',
  clientPermissions: [],
  userPermissions: [],
  run: async (client, msg, args) => {
    Levels.setURL(process.env.mongo_url);

    let member;
    if (msg.mentions.users.first()) {
      member = msg.mentions.users.first();
    } else {
      member = msg.author;
    }

    let argsLevel;
    if (msg.mentions.users.first()) {
      argsLevel = args[1];
    } else {
      argsLevel = args[0];
    }

    if (!argsLevel) {
      const SetLevel = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Error')
      .setDescription('Please provide the level you want to set');
      return msg.channel.send({ embeds: [SetLevel] });
    }

    const user = await Levels.fetch(member.id, msg.guild.id);

    if (user.level > argsLevel) {
      Levels.setLevel(member.id, msg.guild.id, `-${argsLevel}`);
    } else {
      Levels.setLevel(member.id, msg.guild.id, argsLevel);
    }
    const Finished = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Green')
    .setDescription(`Successfuly set ${member}'s level to ${argsLevel}!`);
    msg.channel.send({ embeds: [Finished] });
  },
};
