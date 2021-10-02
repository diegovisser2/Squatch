const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const { staffrole, adminrole, breakrole } = require("../../config/constants/roles.json");
const { Color, serverID } = require("../../config/constants/other.json")

module.exports = {
  name: "google",
  description: "google",
  aliases: [],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    msg.delete();
  const ask = new Discord.MessageEmbed()
        .setTitle("Google")
        .setDescription("Please make sure you checked your question on google before you ask it here, as some questions might be easily answered on google")
    ;
    msg.channel.send({ embeds: [ask] })
  }
}