const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { staffrole, adminrole, breakrole } = require("../../config/constants/roles.json");
const { Color, serverID } = require("../../config/constants/other.json")

module.exports = {
  name: "donate",
  description: "lists the multiple ways you could donate",
  aliases: ["donates"],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    //Start
    message.delete();

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle("Donations")
      .setDescription("Ways you can donate")
      .addField(`**BTC**`, `1MroKmg9K1aJUqJihvRQkWMSwaSYgYh8VN`)
      .addField(`**Ethereum**`, `0xedf74a72b99edfb28ff98ea54123e005e9cd8b3c`)
      .addField(`**Litecoin**`, `La3S1ufndcg3X2FEARrvoPwxph7WMqxds3`)
      .addField(`**Tether**`, `3DX1HcszzUgMy8gBPZ1kcGnotYpfNzihHN`)
    ;

    message.channel.send(embed);
  }
};