const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	author_name: String,	
	text: String,
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room'
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Message', MessageSchema)