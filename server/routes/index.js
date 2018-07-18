const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const nodemailer = require('nodemailer')

const User = require('../models/User')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '172.3itstep2017@gmail.com', // generated ethereal user
        pass: 'fsnihgdmbxfwhptq' // generated ethereal password
    }
});

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, next)=> {
	User.findOne({email: email, accepted: true})
	.exec((err, user)=> {
		if(err || !user) return next(err, null)
		user.comparePassword(password, (err, isEqual)=> {
			if(err) return next(err, null)
			if(isEqual) return next(null, user)
			return next(null, false)
		})
	})
}))

// Saving in session
passport.serializeUser((user, next)=> {
	return next(null, user._id)
})

// Reading data about user
passport.deserializeUser((id, next)=> {
	User.findById(id).exec((err, user)=> {
		return next(err, user)
	})
})

router.use(passport.initialize())
router.use(passport.session())

router.post('/register', (req, res, next)=> {
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})

	user.save((err, user)=> {	
		if(err) return res.send(err)
		let mailOptions = {
	        from: '"Blog App" <172.3itstep2017@gmail.com>', // sender address
	        to: user.email, // list of receivers
	        subject: 'Sign Up Confirmation', // Subject line
	        // text: 'Hello world?', // plain text body
	        html: `<p>Hello Mr.${user.name}. Please finish your registration on Blog App.</p><a href="http://localhost:3000/api/accept/${user._id}">Move to link</a>` // html body
	    }

	    transporter.sendMail(mailOptions, (error, info)=> {
	    	if(err) return res.sendStatus(401).send(err)
	    	res.sendStatus(200)
	    })
	})
})

router.get('/accept/:id', (req, res, next)=>{
 	User.findById(req.params.id)
 		.exec((err, user)=>{
 			if(err) return res.send(err);
 			user.accepted = true;
 			user.save((err, user)=>{
				if(err) return res.send(err)
				res.redirect('/auth')
			})
 			
 		})
})


router.post('/auth', passport.authenticate('local'), (req, res, next)=> {
	res.cookie('session', JSON.stringify(req.user))
	res.send(req.user)
	// User.findOne({email: req.body.email})
	// .exec((err, user)=> {
	// 	if(err) return res.Status(400).send(err)
	// 	if(!user) return res.sendStatus(400)
	// 	user.comparePassword(req.body.password, (err, isEqual)=> {
	// 		if(err) return res.sendStatus(400).send(err)
	// 		if(!isEqual) res.sendStatus(400)
	// 		else {
	// 			res.cookie('session', JSON.stringify(user))
	// 			res.send(user)
	// 		}
	// 	})
	// })
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
router.use('/comment', require('./comment'))



module.exports = router