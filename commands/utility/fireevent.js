const { botdev } = require("../../config/constants/roles.json")
const { xEmoji } = require("../../config/constants/other.json")
module.exports = {
	name: "emitevent",
	aliases: ["emulateevent"],
	category: "utility",
	description: "Manually emit an event.",
	run: (client, msg, data) => {
		const args = data["args"];
		if (!message.member.roles.cache.has(botdev)) return message.channel.send(`${xEmoji} Only bot developers can use this command!`)
		try {
			message.client.emit(data.args[0], data.args.slice(1))
		} catch(e){
			console.error(e)
			return message.channel.send(":x: An error occured.")
		}
		console.log(data.args, data.args.slice(1))
		message.channel.send(":white_check_mark: Successfully emitted event.")
	}
}