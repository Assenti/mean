const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
	title: String, 
	content: String,
	author: String,
	date: {
		type: Date,
		default: Date.now
	},
	link: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	liked_users: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
	]
})

module.exports = mongoose.model('Post', PostSchema)