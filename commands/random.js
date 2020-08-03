module.exports = {
    name: 'random',
    description: 'This is a random generator',
    execute(msg, args) {
        msg.send(' here\'s your random integer: ' + Math.floor(Math.random() * 10))
    }
}