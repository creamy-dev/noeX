var Discord = require("discord.js");

module.exports = {
	name: 'ban',
	description: 'Ban people from server',
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
			.setTitle('Ban | Missing Arguments')
			.addField("Error!", "Missing Arguments")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
         const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Ban | Permissions Error')
			.addField("Error!", "You are missing permissions.")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (!message.guild.me.hasPermission("BAN_MEMBERS") && !message.guild.me.hasPermission("ADMINISTRATOR")) {
        const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Ban | Permissions Error')
			.addField("Error!", "I don't have permission")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (message.mentions.members.first() === null || message.mentions.members.first() === undefined || message.mentions.members.first() === "") {
         const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Ban | User Error')
			.addField("Error!", "Invalid user")
			.setFooter(`haha bad`);
		 message.channel.send(embed2)
        } else if (wtf_discordjs.id == message.author.id) {
            const embed2 = new Discord.MessageEmbed()
		    	.setColor('#0099ff')
		    	.setTitle("Ban | You're funny.")
		    	.addField("Error!", "You can't Ban yourself, dummy.")
		       	.setFooter(`haha bad`);
		    message.channel.send(embed2)
        } else if (message.mentions.members.first().roles.highest.position > message.guild.members.resolve(message.client.user).roles.highest.position) {
            const embed2 = new Discord.MessageEmbed()
		    	.setColor('#0099ff')
		    	.setTitle("Ban | lol")
		    	.addField("Error!", "That person is higher than me, boomer")
		       	.setFooter(`haha bad`);
		    message.channel.send(embed2)
		} else if (message.client.user.id == wtf_discordjs.id) {
			const embed2 = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle("Ban | thats mean :(")
				.addField("Error!", "You can't ban me! ;(")
				.setFooter(`haha bad`);
			message.channel.send(embed2)
		} else {
            try {
                message.mentions.members.first().ban({reason: "Banned by " + message.member.user.tag});
                const embed2 = new Discord.MessageEmbed()
		        	.setColor('#0099ff')
		        	.setTitle('Ban | Success!')
			        .addField("Adios!", "We wont miss you.")
		         	.setFooter(`haha bad`);
		        message.channel.send(embed2)
            } catch (e) {
                const embed2 = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Ban | Unknown error')
                    .addField("Error!", "Unknown Error. Make Hacks deal with it!")
                    .setFooter(e);
                message.channel.send(embed2)
            }
        }
	},
};