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
      return msg.channel.send("Please provide the level you want to set");
    }

    const user = await Levels.fetch(member.id, msg.guild.id);

    if (user.level > argsLevel) {
      Levels.setLevel(member.id, msg.guild.id, `-${argsLevel}`);
    } else {
      Levels.setLevel(member.id, msg.guild.id, argsLevel);
    }

    msg.channel.send(`Set ${member}'s level to ${argsLevel}`);
  },
};
