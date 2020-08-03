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

client.on('message', msg => {
    if(!msg.content.startsWith(PREFIX) || msg.author.bot) return

    const args = msg.content.slice(PREFIX.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === 'ping')  {
        client.command.get('ping').execute(msg, args)
    } else if(command === 'pong') {
        client.command.get('pong').execute(msg, args)
    }
})


client.login(process.env.token)