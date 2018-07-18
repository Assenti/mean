const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const path = require('path')

const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get('/', (req, res, next)=>{
 	Post.find()
 		.exec((err, posts)=>{
 			if(err) return res.send(err);
 			res.send(posts);
 		})
})

router.get('/:id', (req, res, next)=>{
 	Post.findById(req.params.id).populate('comments')
 		.exec((err, post)=>{
 			if(err) return res.send(err);
 			res.send(post);
 		})
})


router.post('/', upload.single('file'), (req, res, next)=>{
	var post = new Post({
	title: req.body.title,
	content: req.body.content,
	author: req.body.author
	})

	let tempPath = path.resolve(req.file.path);
	let targetPath = path.resolve(__dirname, `../../public/uploads/${post._id}.${req.file.originalname.split('.').pop()}`);

	fs.rename(tempPath, targetPath, (err)=> {
		if(err) return res.send(err)
		post.link = `/uploads/${post._id}.${req.file.originalname.split('.').pop()}`;
		post.save((err, post)=>{
			if(err) return res.send(err)
			res.send(post)
		})
	})

	
})

router.delete('/:id', (req, res, next)=>{
	Post.remove({_id: req.params.id})
	.exec((err, result)=>{
		if(err) return res.send(err)
		res.sendStatus(200)
	})
})


router.put('/', (req, res, next)=> {
	Post.findById(req.body._id)
	.exec((err, post)=> {
		if(err) return res.status(500).send(err)
		else {
			post.title = req.body.title;
			post.content = req.body.content;
			post.author = req.body.author;
			post.save((err, result)=> {
				if(err) res.status(500).send(err)
				else res.status(200).send(result)
			})	
		}
		
	})
})

module.exports = router