const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { adminrole } = require('../../config/constants/roles.json');

module.exports = {
  name: 'giverole',
  description: 'description',
  aliases: [],
  category: 'management',
  clientPermissions: [],
  userPermissions: [],
  run: (client, message, data) => {
    message.delete();
    const Prohibited = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Prohibited User')
      .setDescription('You are prohibited from doing this command');
    const AlreadyHas = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Error')
      .setDescription('User already has that role');
    const Error = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Error')
      .setDescription('Error - Use format giverole <member> <role>');
    const RoleError = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Error')
      .setDescription('Role doesnt exist');
    if (!message.member.roles.cache.has(adminrole)) return msg.reply({ embeds: [Prohibited] });

    if (!data.args[0] || !data.args[1]) return message.channel.send({ embeds: [Error] });

    try {
      const member = message.mentions.members.first()
        || message.guild.members.cache.get(data.args[0]);
      const roleName = message.guild.roles.cache.find(
        (r) => r.name === data.args[1].toString()
          || r.id === data.args[1].toString().replace(/[^\w\s]/gi, ''),
      );

      // get position of role - gives you integer
      const userRolePosition = message.member.roles.highest.position;
      const selectedRolePosition = roleName.position;
      
      if(userRolePosition < selectedRolePosition) {
        const embed = new MessageEmbed()
              .setTitle("You don't have access to selected role.")
              .setColor("RED")
        
        return message.channel.send(embed)
      }
      
      const alreadyHasRole = member._roles.includes(roleName.id);

      if (alreadyHasRole) {
        return message.channel
          .send(AlreadyHas)
          .then((message) => message.delete({ timeout: 5000 }));
      }

      const embed = new MessageEmbed()
        .setTitle('Role successfully recieved')
        .setColor("GREEN")
        .setDescription(
          `**Moderator:** ${message.author}\n**Role Recieved:** ${roleName}\n**Member:** ${member.user}`,
        );
      return member.roles.add(roleName).then(() => message.channel.send(embed));
    } catch (e) {
      return message.channel
        .send({ embeds: [RoleError] });
    }
  },
};
