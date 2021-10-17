const Discord = require('discord.js');

module.exports = {
  name: 'giverole',
  description: 'description',
  aliases: [],
  category: 'moderation',
  clientPermissions: [],
  userPermissions: [],
	/**
	 * 
	 * @param {Discord.Client} client 
	 * @param {Discord.Message} message 
	 * @param {Array} args 
	 */
  run: async (_client, message, args) => {
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

		message.delete();

    // if (!message.member.roles.cache.has(staffrole)) return message.reply({ embeds: [Prohibited] });
    if (!args[1]) return message.channel.send({ embeds: [Error] }); // If there is args[1], there must be args[0]

    try {
      const member = message.mentions.members.first()
        || message.guild.members.cache.get(args[0]);
      const roleName = message.guild.roles.cache.find(
        (r) => r.name === args[1].toString()
          || r.id === args[1].toString().replace(/[^\w\s]/gi, ''),
      );

			if(!roleName) return message.channel.send({ embeds: [RoleError] });

      // get position of role - gives you integer
      const userRolePosition = message.member.roles.highest.position;
      const selectedRolePosition = roleName.position;
      
      if(userRolePosition < selectedRolePosition) {
        const embed = new Discord.MessageEmbed()
              .setTitle("You don't have access to selected role.")
              .setColor("RED")
        
        return message.channel.send({ embeds: [embed] })
      }
      
      const alreadyHasRole = await member.roles.cache.has(roleName.id);

      if (alreadyHasRole) {
        return message.channel
          .send({ embeds: [AlreadyHas] })
          .then((message) => message.delete({ timeout: 5000 }));
      }

      const embed = new Discord.MessageEmbed()
        .setTitle('Role successfully recieved')
        .setColor("GREEN")
        .setDescription(
          `**Moderator:** ${message.author}\n**Role Recieved:** ${roleName}\n**Member:** ${member.user}`,
        );
      return member.roles.add(roleName).then(() => message.channel.send({ embeds: [embed] }));
    } catch (e) {
			console.error(e);
      return message.channel.send({ embeds: [RoleError] });
    }
  }
};