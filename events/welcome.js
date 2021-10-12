const Discord = require('discord.js');
const { welcomechannel } = require('../config/constants/channel.json');


module.exports = (client) => {
    client.on("guildMemberAdd", (member) => {
        var welcometext = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ]
        var randomizedmessage = Math.floor(Math.random() * welcometext.length);
        const channel = member.guild.channels.cache.get(welcomechannel);
        channel.send({ embeds: [welcometext[randomizedmessage]] });
    });
};