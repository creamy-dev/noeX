var Discord = require("discord.js");

module.exports = {
	name: 'clear',
	description: 'Clear the chat',
	aliases: ['c'],
	usage: '[amount]',
	category: "Moderation",
	guildOnly: true,
	cooldown: 4,
	execute(message, args) {
        var argz = args.join(` `);
        if (argz === "") {
        const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Clear | Missing Arguments')
			.addField("Error!", "Missing Arguments")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("ADMINISTRATOR")) {
         const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Clear | Permissions Error')
			.addField("Error!", "You are missing permissions.")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (!message.guild.me.hasPermission("MANAGE_MESSAGES") && !message.guild.me.hasPermission("ADMINISTRATOR")) {
        const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Clear | Permissions Error')
			.addField("Error!", "I don't have permission dummy")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (isNaN(argz) || argz > 98) {
			const embed2 = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Clear | Not a number!')
				.addField("Error!", "That isn't a number.")
				.setFooter(`haha bad`);
		 	message.channel.send(embed2)
		} else {
			try {
				message.channel.bulkDelete(argz).then(() => {
					const embed2 = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Clear | Cleared ' + argz + ' messages!')
						.addField("Success!", "It worked! 🎉")
						.setFooter(`haha bad`);
					message.channel.send(embed2)
				  });
			} catch (e) {
				const embed2 = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Clear | Unexpected Error!')
					.addField("Error!", "There was a unexpected error.")
					.setFooter(e);
				message.channel.send(embed2)
			}
		}
	},
};