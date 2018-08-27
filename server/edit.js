const Post = require('./models/Post')
const Comment = require('./models/Comment')

const redis = require('redis')
const client = redis.createClient()
client.on('error', (err)=> console.log(`Error: ${err}`))


const editRedis = {
	edit: function (id){
		console.log(id)
		Post.findById(id).populate('comments')
		.exec((err, post)=> {
			if(err) return 
			client.set(post._id.toString(), JSON.stringify(post), redis.print)
		})
	},
	del: function (id){
		console.log(id)
		Post.findById(id).populate('comments')
		.exec((err, post)=> {
			if(err) return 
			client.del(id.toString(), redis.print)
		})
	}
}



module.exports = editRedis