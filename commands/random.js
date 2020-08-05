module.exports = {
    name: 'random',
    description: 'This is a random generator',
    usage: '',
    execute(msg, args) {
        msg.channel.send('Here\'s your random integer: ' + Math.floor(Math.random() * 10))
    }
}