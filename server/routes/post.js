const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const path = require('path')
const asyncMiddleware = require('../async')
const redis = require('redis')
const editRedis = require('../edit')

const client = redis.createClient()
client.on('error', (err)=> console.log(`Error: ${err}`))


const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get('/', (req, res, next)=> {
	Post.find().exec((err, posts)=>{
		if(err) return res.sens(err)
		res.send(posts)
	})
})


router.get('/home/:page', (req, res, next)=>{
 	Post.find().skip((req.params.page - 1) * 5)
 		.limit(5)
 		.exec((err, posts)=>{
 			if(err) return res.send(err);
 			Post.count().exec((err, count)=>{
 				if(err) return res.send(err)
 				res.send({posts: posts, count: count});
 			})
 			
 		})
})


router.get('/profile/:page', (req, res, next)=>{
 	Post.find()
 		.limit(parseInt(req.params.page))
 		.exec((err, posts)=>{
 			if(err) return res.send(err);
 			Post.count().exec((err, count)=>{
 				if(err) return res.send(err)
 				res.send({posts: posts, count: count});
 			})
 			
 		})
})

// Including redis to our END POINT
router.get('/:id', (req, res, next)=>{
 	client.get(req.params.id, (err, post)=> {
 		if(err) return res.send(err)
 		if(post) {
 			console.log('redis')
 			res.send(JSON.parse(post))
 		} else {
 			console.log('mongo')
 			Post.findById(req.params.id).populate('comments')
			.exec((err, post)=>{
				if(err) return res.send(err);
					client.set(req.params.id, JSON.stringify(post), redis.print)
					res.send(post);
				})
 		}
 	})		
 })




router.get('/search/:query', (asyncMiddleware(async (req, res, next)=> {
	const myRexExp = new RegExp(`${req.params.query}`, 'i')
	let result = await Post.find({
		$or: [
			{title: myRexExp},
			{content: myRexExp}
		]
	}).limit(5).exec()
	res.send(result)
})))

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
		editRedis.del(req.params.id)
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
				if(err) return res.status(500).send(err)
				res.sendStatus(200).end(result)
				editRedis.edit(post._id)
			})	
		}
		
	})
})


router.put('/like/:id', asyncMiddleware(async (req, res, next)=> {
	if(req.user) {
		let post = await Post.findById(req.params.id).exec()
		console.log(post.liked_users, post.liked_users.includes(req.user._id), `${req.user._id}`)
		var index = post.liked_users.indexOf(req.user._id);
		console.log(index)
		if(index >= 0){
			post.liked_users = post.liked_users.filter((user)=> user != `${req.user._id}`)
			console.log(post.liked_users)

		}
		else {
			post.liked_users.push(req.user._id);
		}

		post.save((err, post)=> {
			if(err) res.send(err)
			res.send(post)
		})
	} else {
		res.sendStatus(401)
	}
}))

module.exports = router