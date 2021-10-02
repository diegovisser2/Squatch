const { MessageEmbed } = require("discord.js");
const { Color } = require("../config/constants/other.json")
const { channelLog } = require("../config/constants/channel.json")

module.exports = (client) => {
	client.on("guildMemberRemove", async(member) => {
    let logs = await client.channels.cache.get(channelLog);
        	let embed = new MessageEmbed()
            .setTitle("Member Left")
            .setColor(Color)
            .setDescription(`A member left the server.`)
            .addField("User", member.user.tag, true)
            .addField("User ID", member.id, true) 
            .addField("User Account Registered At", member.user.createdAt)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            return logs.send(embed);
    })
}