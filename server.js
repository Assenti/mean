const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const path = require('path')
mongoose.connect('mongodb://localhost/mean')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: '1mb'}))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api', require('./server/routes'))


app.listen(3000, ()=>{
	console.log('Server started on port 3000...')
})