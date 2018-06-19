const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

router.get('/', (req, res, next)=>{
 	Post.find()
 		.exec((err, posts)=>{
 			if(err) return res.end(err);
 			res.send(posts);
 		})
})


router.post('/', (req, res, next)=>{
	var post = new Post({
	title: req.body.title,
	content: req.body.content,
	author: req.body.author
	})

	post.save((err, post)=>{
		if(err) return res.send(err)
		res.send(post)
	})
})

router.delete('/:id', (req, res, next)=>{
	Post.remove({_id: req.params.id})
	.exec((err, result)=>{
		if(err) return res.send(err)
		res.send(200)
	})
})


module.exports = router