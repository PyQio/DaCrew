module.exports = {
    name: 'ping',
    // cooldown (in seconds) given to the command
    cooldown: 5,
    description: 'This is a ping command',
    execute(msg, args) {
        msg.channel.send('pong')
    }
}