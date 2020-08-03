module.exports = {
    name: 'ping',
    description: 'This is a ping command',
    execute(msg, args) {
        msg.channel.send('pong')
    }
}