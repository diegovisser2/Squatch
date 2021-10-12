const { xEmoji } = require('../../config/main.json');
const { adminrole } = require('../../config/constants/roles.json');

module.exports = {
  name: 'emitevent',
  aliases: ['emulateevent'],
  category: 'utility',
  description: 'Manually emit an event.',
  run: (client, msg, data) => {
    const { args } = data;
    if (!msg.member.roles.cache.has(adminrole)) return msg.channel.send(`${xEmoji} Only Administrators can use this command!`);
    try {
      msg.client.emit(data.args[0], data.args.slice(1));
    } catch (e) {
      console.error(e);
      return nsg.channel.send(`${xEmoji} An error occured.`);
    }
    console.log(data.args, data.args.slice(1));
    msg.channel.send(':white_check_mark: Successfully emitted event.');
  },
};
