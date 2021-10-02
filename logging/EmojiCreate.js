const { MessageEmbed } = require("discord.js");
const { Color } = require("../config/constants/other.json")
const { channelLog } = require("../config/constants/channel.json")

module.exports = (client) => {
	client.on("emojiCreate", async(emoji) => {
    let logs = await client.channels.cache.get(channelLog);
     let embed = new MessageEmbed()
            .setTitle("Emoji Added")
            .setColor(Color)
            .setDescription(`A custom emoji was added to the server.`)
            .addField("Emoji Name", emoji.name, true)
            .addField("Emoji ID", emoji.id, true) 
            .addField("Animted Emoji?", emoji.animated)
            emoji.author ? embed.addField("Added By", emoji.author.tag) : null
            return logs.send(embed);
  })
}
