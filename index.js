// random prefix chosen as the first char. Each command will have this 
// format: PREFIX + ${command}. You can easily change the PREFIX just by
// changing this const.
const PREFIX = '+'

const fs = require ('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

// this first section of the code reads the file used in ./commands/${file}
// for each command (command: PREFIX + ${command})
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

// once the bot is ready, you should read Logged in as ${nameChosenForTheBot}!
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
    // if the message doesn't start with the prefix or the author is the bot, then 
    // the message isn't considered.
    if(!message.content.startsWith(PREFIX) || message.author.bot) return

    // if the message could be a command, it will split the args based on / +/,
    // aka a space (' ') or more than one (like "   ").
    const args = message.content.slice(PREFIX.length).split(/ +/)
    const commandName = args.shift().toLowerCase()

    // once command and args are split, we can now check whether or not
    // the command exists in the client.commands Collection
    if (!client.commands.has(commandName)) return

    // the command itself
    const command = client.commands.get(commandName);
    
    // if args are important or needed for the command, please remember to set args: true 
    // in the module.exports, otherwise this check won't be considered. To let the user know
    // what argument should be used for that command, add usage: '<something> <other>', 
    // in the command file, so that it will be shown 
    if (command.args && !args.length) {
        //${message.author} is the @ to the actual person that invoked the command.
        let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`` + PREFIX + `${command.name} ${command.usage}\``;
        }
        
		return message.channel.send(reply);
    }

    try {
        // the proper execution of the command
        client.commands.get(commandName).execute(message, args)
    } catch (error) {
        console.error(error)
        message.reply('there was an error trying to execute that command!')
    }
})


client.login(process.env.token)