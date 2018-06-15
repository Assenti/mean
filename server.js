const express = require('express')
const app = express()

app.get('/', (req, res, next)=>{
	res.send('Home Page')
})

app.get('/about', (req, res, next)=>{
	res.send('About Page')
})

app.listen(3000, ()=>{
	console.log('Server started on port 3000...')
})