const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
	title: String, 
	content: String,
	author: String,
	data: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Post', PostSchema)