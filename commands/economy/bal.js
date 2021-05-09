module.exports = {
	name: 'bal',
	description: 'Example command!',
	aliases: ['ba', "bl"],
	usage: '',
	category: "Economy",
	cooldown: 5,
	execute(message, args) {
		message.channel.send("Something big is coming soon!");
	},
};