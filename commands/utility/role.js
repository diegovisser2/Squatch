const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const { partnermanagerrole, partnerrole } = require("../../config/constants/roles.json");
const { Color, serverID } = require("../../config/constants/other.json")

function getIdFromMention(mention) {
  return_id = mention.replace("<@!", "").replace("<@&", "").replace("<@", "").replace(">", "");
  return return_id;
};

module.exports = {
  name: "roles",
  description: "allows users to give themself's a selected role",
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    message.delete();
    let rolelist = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`**Roles**`)
        .setDescription("The current roles you can recieve are:")
        .addField("Operating Systems", "Apple\nAndroid\nWindows\nLinux\n")
        .addField("Programming Languages", "Java\nJavascript\nPython\nHTML\nC++\nKotlin\nKotlin\nPHP\nCSS\nMysql\n")
        .addField("Misc", "Welcome Squad\nAnnouncement\nRaspberry pi\nPolls\nNetworking\nGiveaway\nCyber security\n")
    ;
    let error = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Error`)
        .setDescription(`You cannot claim a role higher than the member role`)
    ;
    let unmentioned = getIdFromMention(args.join(" "))
    let role = message.guild.roles.cache.find(role => role.id === unmentioned) || message.guild.roles.cache.find(role => role.name.toLowerCase() === args.join(" ").toLowerCase());
    if(!role) return message.channel.send(rolelist);
    if(role.position >= message.member.roles.highest.position) return message.channel.send(error).then(msg => msg.delete({ timeout: 5000}))
    const embed = new Discord.MessageEmbed()
        .setTitle(`New Role!`)
        .setDescription(`${message.author.tag} you successfuly recieved the role ${role}!`)
        .setFooter(`Author ID: ${message.author.id}`)
    if (message.member.roles.cache.has(role.id)) {
      const remEmbed = new Discord.MessageEmbed()
        .setTitle(`Role removed!`)
        .setDescription(`${message.author.tag} you successfully removed the  role${role}!`)
        .setFooter(`Author ID: ${message.author.id}`)
      message.member.roles.remove(role.id).catch(error => console.log(error))
        .then(m => message.channel.send(remEmbed)).then(msg => msg.delete({ timeout: 5000}))
    }
    message.member.roles.add(role.id).catch(error => console.log(error))
        .then(m => message.channel.send(embed)).then(msg => msg.delete({ timeout: 5000}))
    }
};