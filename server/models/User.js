const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
	email: { type: String, unique: true},
	name: String,
	password: String,
	accepted: { type: Boolean, default: false}
})

UserSchema.pre('save', function(next) {
	var user = this;
	console.log(user, 'sss')
	if(!user.isModified('password')){
		return next()
	}

	bcrypt.genSalt(10, (err, salt)=> {
		if(err) return next(err)
		bcrypt.hash(user.password, salt, (err, hash)=> {
			if(err) return next(err)
			user.password = hash
			next()
		})
	})
})


UserSchema.methods.comparePassword = function(password, next){
	var user = this;

	bcrypt.compare(password, user.password, (err, isEqual)=> {
		if(err) return next(err)
		return next(null, isEqual)
	})
}


module.exports = mongoose.model('User', UserSchema)