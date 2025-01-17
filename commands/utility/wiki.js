const Discord = require('discord.js');

module.exports = {
    name: 'wiki',
    description: 'lets you find a wikipedia article',
    aliases: [],
    category: 'utility',
    clientPermissions: [],
    userPermissions: [],
    run: (client, msg, args) => {
    const search = args.join("_");
    const error = new Discord.MessageEmbed()
      .setTitle("Error")
      .addField(`Please enter something to search for`)
      .setColor("RED");
    if (!msg) {
      return msg.channel.send({ embeds: [error] });
    }
    const link = `https://www.wikipedia.org/w/index.php?search=${search}&ns0=1`;
    const embed = new Discord.MessageEmbed()
      .setTitle("Wikipedia Search")
      .addField(`You Searched for:`, `${msg}`)
      .addField(`Results:`, `[Link to the article](${link})`)
      .setColor("GREEN");

    msg.channel.send({ embeds: [embed] });
  },
};