const { MessageEmbed } = require("discord.js");
const { Color } = require("../config/constants/other.json")
const { channelLog } = require("../config/constants/channel.json")

module.exports = (client) => {
	client.on("guildMemberAdd", async(member) => {
    let logs = await client.channels.cache.get(channelLog);
        	let embed = new MessageEmbed()
            .setTitle("Member Joined")
            .setColor(Color)
            .setDescription(`A new member joined the server.`)
            .addField("User", member.user.tag, true)
            .addField("User ID", member.id, true) 
            .addField("User Joined At", member.joinedAt, true)
            .addField("User Account Registered At", member.user.createdAt, true)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            return logs.send(embed);
    })
}