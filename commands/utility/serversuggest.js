const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { suggestchannel } = require('../../config/constants/channel.json');

module.exports = {
  name: 'serversuggest',
  description: 'server suggestions!',
  aliases: [],
  category: 'utility',
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const { args } = data;
    msg.delete();
    const suggestmsg = args.join(' ');
    const noarg = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Error')
      .setDescription('Error')
      .setFooter(`${msg.author.username}`);
    if (!suggestmsg) return msg.channel.send(noarg).then((msg) => msg.delete({ timeout: 10000 }));
    const suggestembed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('New Suggestion')
      .setDescription(`${suggestmsg}`)
      .setFooter(`Suggested by ${msg.author.username}!`);
    if (suggestchannel) {
      msg.member.guild.channels.cache.get(suggestchannel).send(suggestembed).then(async (msg) => {
        await msg.react('👍');
        await msg.react('👎');
      });
    }
  },
};
