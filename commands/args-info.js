module.exports = {
	name: 'args-info',
	description: 'Information about the arguments provided.',
	// this is just a test for any kind of command with any number of args,
	// so args is needed to be set true. See ../index.js for more details
    args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar')
		}
		
		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`)
	},
};
