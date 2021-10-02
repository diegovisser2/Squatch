const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { staffrole, adminrole, breakrole } = require("../../config/constants/roles.json");
const { Color, serverID } = require("../../config/constants/other.json")

module.exports = {
  name: "credit",
  description: "lists everyone who helped with the bot",
  aliases: ["credits"],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    message.delete();
    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle("Bot Developers")
      .setDescription(`Lists people who helped with the creation of the bot`)
      .addField("**Developer**", "<@681179104951009530>")
    ;
    message.channel.send(embed);
  }
};