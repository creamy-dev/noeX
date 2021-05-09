const { prefix } = require('../../config.json');
const Discord = require("discord.js")

module.exports = {
	name: 'help',
	description: 'Lists all commands.',
	aliases: ['commands'],
	usage: '[command name]',
	category: "Other",
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;

		if (!args.length) {
			let optimizationPOG = 0; let whatPT2 = 0;
			const what = commands.map(command => command.category);
			let tf = [{name: "Fun", value: ""}, {name: "Moderation", value: ""}, {name: "Economy", value: ""}, {name: "Other", value: ""}]
			const temp = commands.map(command => command.name);
			temp.forEach(function(entry) {
				if (what[whatPT2] == "Fun") {
					var tempy = tf[0]; 
					var adios = JSON.parse(JSON.stringify(tempy));
					if (adios.value === "") {
						adios.value = "`" + entry + "`";
					} else {
						adios.value = adios.value + ", `" + entry + "`";
					}
					tf[0] = adios;
				} else if (what[whatPT2] == "Other") {
					var tempy = tf[3]; 
					var adios = JSON.parse(JSON.stringify(tempy));
					if (adios.value === "") {
						adios.value = "`" + entry + "`";
					} else {
						adios.value = adios.value + ", `" + entry + "`";
					}
					tf[3] = adios;
				} else if (what[whatPT2] == "Moderation") {
					var tempy = tf[1]; 
					var adios = JSON.parse(JSON.stringify(tempy));
					if (adios.value === "") {
						adios.value = "`" + entry + "`";
					} else {
						adios.value = adios.value + ", `" + entry + "`";
					}
					tf[1] = adios
				} else if (what[whatPT2] == "Economy") {
					var tempy = tf[2]; 
					var adios = JSON.parse(JSON.stringify(tempy));
					if (adios.value === "") {
						adios.value = "`" + entry + "`";
					} else {
						adios.value = adios.value + ", `" + entry + "`";
					}
					tf[2] = adios
				}
				whatPT2++;
			});
				

			while (optimizationPOG !== 3) {
				if (JSON.parse(JSON.stringify(tf[optimizationPOG])).value === "") {
					var tempf = JSON.parse(JSON.stringify(tf[optimizationPOG]));
			 		tempf.value = "No commands for this category!"
					tf[optimizationPOG] = tempf;
				} 
				optimizationPOG++;
			}

			const embed2 = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Help')
				.addFields(tf[0], tf[1], tf[2], tf[3])
				.setFooter(`Tip: You can send \`${prefix}help [command name]\` to get info on a specific command!`);
				return message.author.send(embed2)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.react("📬")
				})
				.catch(error => {
					if (error == "DiscordAPIError: Cannot send messages to this user") {
						const embed2 = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Error | Help')
							.addField("Error!", "Your dms are off!")
							.setFooter(`haha simp`);
						message.channel.send(embed2)
					} else {
						console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
						const embed2 = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Error | Help')
							.addField("Unknown error!", "There was a unknown error DMing you!")
							.setFooter(error);
						message.channel.send(embed2)
					}
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			const embed2 = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Help | Error')
				.addField("Error", "That isn't a command!")
				.setFooter(`haha simp`);
			message.channel.send(embed2);
		}
		const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Help')
			.addField("Name", command.name)
			.addField("Aliases", command.aliases.join(', '))
			.addField("Description", `${command.description}`)
			.addField("Usage", `${prefix}${command.name} ${command.usage}`)
			.addField("Cooldown", command.cooldown || 3)
			.setFooter(`haha simp`);
		message.channel.send(embed2) //if this throws a error because "empty fields" blame it on Hacks or whoever wrote third party commands
	}
};