const Levels = require("discord-xp");
const Canvas = require("discord-canvas"),
Discord = require("discord.js");
const theuser = require("../../misc/user.js");

module.exports = {
  name: 'rank',
  description: 'list your current rank in the server',
  aliases: ['ranks', 'level'],
  category: 'leveling',
  clientPermissions: [],
  userPermissions: [],
  run: async (client, msg, args) => {
    Levels.setURL(process.env.mongo_url);

    let target;
    if (msg.mentions.users.first()) {
      target = msg.mentions.users.first();
    } else {
      target = msg.author;
    }

    const ub = await theuser.findOne({
      User: target.id,
    });

    let points;
    if (!ub) {
      points = 0;
    } else {
      points = ub.Reps;
    }

    let repBadges;

    if (points > 5 && points < 10) {
      repBadges = "bronze";
    } else if (points > 10 && points < 30) {
      repBadges = "silver";
    } else if (points > 30 && points < 50) {
      repBadges = "gold";
    } else if (points > "50") {
      repBadges = "diamond";
    }

    let msg;

    if (ub) {
      msg = ub.Messages;
    } else {
      messages = 0;
    }

    let msgBadges;

    if (messages > 100 && messages < 500) {
      msgBadges = "bronze";
    } else if (messages > 500 && messages < 1000) {
      msgBadges = "silver";
    } else if (messages > 1000 && messages < 5000) {
      msgBadges = "gold";
    } else if (messages > 5000) {
      msgBadges = "diamond";
    }

    const user = await Levels.fetch(target.id, message.guild.id, true);

    if (user) {
      const neededXP = Levels.xpFor(parseInt(user.level) + 1);

      let image = await new Canvas.RankCard()
        .setAddon("xp", true)
        .setAddon("rank", true)
        .setXP("current", user.xp)
        .setXP("needed", neededXP)
        .setBadge(1, msgBadges)
        .setBadge(6, repBadges)
        .setRank(user.position)
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
        .setLevel(user.level)
        .setReputation(points)
        .setRankName("Your text here!")
        .setUsername(`${target.username}#${target.discriminator}`)
        .setBackground("https://i.imgur.com/YRlFuaY.png")
        .toAttachment();

      let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "rank.png"
      );

      msg.channel.send(attachment);
    } else {
      let image = await new Canvas.RankCard()
        .setAddon("xp", true)
        .setAddon("rank", true)
        .setXP("current", 0)
        .setXP("needed", 100)
        .setBadge(1, msgBadges)
        .setBadge(6, repBadges)
        .setRank("0")
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
        .setLevel(0)
        .setReputation(points)
        .setRankName("Your text here!")
        .setUsername(`${target.username}#${target.discriminator}`)
        .setBackground("https://i.imgur.com/YRlFuaY.png")
        .toAttachment();

      let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "rank.png"
      );

      msg.channel.send(attachment);
    }
  },
};
