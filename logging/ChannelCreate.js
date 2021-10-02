const { MessageEmbed } = require("discord.js");
const { Color } = require("../config/constants/other.json")
const { channelLog } = require("../config/constants/channel.json")

module.exports = (client) => {
	client.on("channelCreate", async(channel) => {
    let logs = await client.channels.cache.get(channelLog);
        if(channel.type === "text"){
        	let embed = new MessageEmbed()
            .setTitle("Channel Created")
            .setColor(Color)
            .setDescription(`A new channel was created.`)
            .addField("Channel", channel, true)
            .addField("Channel ID", channel.id, true);
            return logs.send(embed);
        }
    })
}