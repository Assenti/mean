const express = require('express')
const router = express.Router()

const editRedis = require('../edit')

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

router.post('/:id', (req, res, next)=> {
	Post.findById(req.params.id).exec((err, post)=> {
		if(err) return res.send(err)
		var comment = new Comment({
			body: req.body.body,
			author: req.user._id,
			author_name: req.user.name,
			post: post._id
		})
		comment.save((err, comment)=> {
			if(err) return res.send(err)
			post.comments.push(comment._id)
			post.save((err, post)=> {
				if(err) return res.send(err)
				res.send(comment)
				editRedis.edit(comment.post)
			})
		})
	})	
})

router.delete('/:comment_id/:post_id', (req, res, next)=>{
	Comment.remove({_id: req.params.comment_id})
	.exec((err, result)=> {
		if(err) return res.send(err)
		Post.findById(req.params.post_id)
		.exec((err, post)=>{
			if(err) return res.send(err)
			post.comments = post.comments.filter((comment) => comment != req.params.comment_id)
			post.save((err, post)=> {
				if(err) return res.send(err)
				res.sendStatus(200)
				editRedis.edit(post)
			})
		})
	})
})

router.put('/', (req, res, next)=> {
	Comment.findById(req.body._id)
	.exec((err, comment)=> {
		if(err) return res.send(err)
		else {
			comment.body = req.body.body;
			comment.save((err, result)=> {
				if(err) return res.send(err)
				res.sendStatus(200)
				editRedis.edit(comment.post)
			})
		}	
	})
})

// OTHER VERSION
// router.put('/', (req, res, next)=> {
// 	Comment.findById(req.body._id)
// 	.exec((err, comment)=> {
// 		if(err) return res.send(err)
// 		else {
// 			comment.body = req.body.body;
// 			comment.save((err, result)=> {
// 				if(err) return res.send(err)
// 				res.send(comment)
// 			})
// 		}	
// 	})
// })


module.exports = router