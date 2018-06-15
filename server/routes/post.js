const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

router.get('/', (req, res, next)=>{
 	res.send('get posts')
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

module.exports = router