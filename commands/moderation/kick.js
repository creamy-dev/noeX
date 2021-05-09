var Discord = require("discord.js");

module.exports = {
	name: 'kick',
	description: 'Kick people from server',
	aliases: ['k'],
	usage: '[@user]',
	category: "Moderation",
	guildOnly: true,
	cooldown: 3,
	execute(message, args) {
        var argz = args.join(` `);
        var wtf_discordjs = message.mentions.users.first();
        if (argz === "") {
        const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Kick | Missing Arguments')
			.addField("Error!", "Missing Arguments")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
         const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Kick | Permissions Error')
			.addField("Error!", "You are missing permissions.")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (!message.guild.me.hasPermission("KICK_MEMBERS") && !message.guild.me.hasPermission("ADMINISTRATOR")) {
        const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Kick | Permissions Error')
			.addField("Error!", "I don't have permission")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (message.mentions.members.first() === null || message.mentions.members.first() === undefined || message.mentions.members.first() === "") {
         const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Kick | User Error')
			.addField("Error!", "Invalid user")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (wtf_discordjs.id == message.author.id) {
            const embed2 = new Discord.MessageEmbed()
		    	.setColor('#0099ff')
		    	.setTitle("Kick | You're funny.")
		    	.addField("Error!", "You can't kick yourself, dummy.")
		       	.setFooter(`haha bad`);
		    message.channel.send(embed2)
        } else if (message.mentions.members.first().roles.highest.position > message.guild.members.resolve(message.client.user).roles.highest.position) {
            const embed2 = new Discord.MessageEmbed()
		    	.setColor('#0099ff')
		    	.setTitle("Kick | lol")
		    	.addField("Error!", "That person is higher than me, boomer")
		       	.setFooter(`haha bad`);
		    message.channel.send(embed2)
		} else if (message.client.user.id == wtf_discordjs.id) {
			const embed2 = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle("Kick | thats mean :(")
				.addField("Error!", "You can't ban me! ;(")
				.setFooter(`haha bad`);
			message.channel.send(embed2)
		} else {
            try {
                message.mentions.members.first().kick("Kicked by " + message.member.user.tag);
                const embed2 = new Discord.MessageEmbed()
		        	.setColor('#0099ff')
		        	.setTitle('Kick | Success!')
			        .addField("Adios!", "We wont miss you.")
		         	.setFooter(`haha bad`);
		        message.channel.send(embed2)
            } catch (e) {
                const embed2 = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Kick | Unknown error')
                    .addField("Error!", "Unknown Error. Make Hacks deal with it!")
                    .setFooter(e);
                message.channel.send(embed2)
            }
        }
	},
};