const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

router.post('/:id', (req, res, next)=> {
	Post.findById(req.params.id).exec((err, post)=> {
		if(err) return res.send(err)
		var comment = new Comment({
			body: req.body.body,
			author: req.user,
			author_name: req.user.name,
			post: post
		})
		comment.save((err, comment)=> {
			if(err) return res.send(err)
			post.comments.push(comment)
			post.save((err, post)=> {
				if(err) return res.send(err)
				res.send(comment)
			})
		})
	})
	
	
})


module.exports = router