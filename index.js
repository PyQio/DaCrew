const PREFIX = '+'

const fs = require ('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

client.command = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.command.set(command.name, command)
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return

    const args = message.content.slice(PREFIX.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (!client.command.has(command)) return;

    try {
        client.command.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})


client.login(process.env.token)