const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/register', (req, res, next)=> {
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})

	console.log(req.body);
	console.log(user,'asfdss')
	user.save((err, user)=> {
	console.log(err,user)
		
		if(err) return res.send(err)
		res.sendStatus(200)
	})
})


router.post('/auth', (req, res, next)=> {
	User.findOne({email: req.body.email})
	.exec((err, user)=> {
		if(err) return res.Status(400).send(err)
		if(!user) return res.sendStatus(400)
		user.comparePassword(req.body.password, (err, isEqual)=> {
			if(err) return res.sendStatus(400).send(err)
			if(!isEqual) res.sendStatus(400)
			else {
				res.cookie('session', JSON.stringify(user))
				res.send(user)
			}
		})
	})
	// if(req.body.email == 'admin@gmail.com' && req.body.password == 'admin'){
	// 	var session = {id: 12345}
	// 	res.cookie('session', JSON.stringify(session))
	// 	res.send(session)
	// } else {
	// 	res.sendStatus(400).send('Error')
	// }
})

router.post('/logout', (req, res, next)=> {
	res.clearCookie('session')
	res.sendStatus(200)
})

router.use('/post', require('./post'))


module.exports = router