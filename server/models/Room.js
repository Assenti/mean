const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
	name: String,
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message'
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Room', RoomSchema)