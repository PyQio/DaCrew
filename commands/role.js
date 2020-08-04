// THIS NEEDS TO BE IMPLEMENTED YET

module.exports = {
	name: 'role',
	description: 'Changes the role of an account',
    args: true,
    usage: '<user> <role>',
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar')
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`)
	},
}