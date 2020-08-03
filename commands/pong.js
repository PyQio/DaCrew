module.exports = {
    name: 'pong',
    description: 'This is a pong command',
    execute(msg, args) {
        msg.channel.send('Oh, ping is missing')
        console.log('Oh, I\'m playing some ping-pong with no ping')
    }
}