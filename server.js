const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const path = require('path')
const redis = require('redis')
const io = require('socket.io')()
mongoose.connect('mongodb://localhost/mean')

const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: '5mb'}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(session({
	resave: true,
	secret: 'secret',
	name: 'mean',
	saveUninitialized: true,
	key: 'key',
	store: new MongoStore({mongooseConnection: mongoose.connection})
}))



app.use('/api', require('./server/routes'))

app.get('*', (req, res, next)=>{
	res.redirect('/#' + req.originalUrl);
})

const server = app.listen(3000, ()=> console.log('Server started on port 3000...'))

io.attach(server)
const socketEvents = require('./server/socket')
socketEvents(io)







// fsnihgdmbxfwhptq












