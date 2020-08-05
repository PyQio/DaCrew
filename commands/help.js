module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
        const prefix = '+';
        const Discord = require('discord.js');
		const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`` + prefix + `help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }


        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Help for : ${command.name}`)
            .setURL('https://discord.com/new')
            .setAuthor('Some name', 'https://cdn.discordapp.com/app-icons/702972506537197698/ed56ddf792bd026a585cf84949666726.png', 'https://discord.com/new')
            .setDescription(`${command.description}`)
            .setThumbnail('https://cdn.discordapp.com/app-icons/702972506537197698/ed56ddf792bd026a585cf84949666726.png')
            .addFields(
                { name: 'Aliases', value: `${command.aliases.join(', ')}` },
                { name: '\u200B', value: '\u200B' },
                { name: 'Usage', value: prefix + `${command.name} ${command.usage}`, inline: true },
                { name: 'Cooldown', value: `${command.cooldown || 3} second(s)`, inline: true },
            )
            .setImage('https://cdn.discordapp.com/app-icons/702972506537197698/ed56ddf792bd026a585cf84949666726.png')
            .setTimestamp()

            message.channel.send(exampleEmbed);
	},
};
