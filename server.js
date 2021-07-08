require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')
// connect to the db from models index.js
const db= require('./models')
db.connect()

// config express app
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// middlewares -- remember that middle ware has be before routes to controllers
app.use(cors()) 
// for the request body -- body parse middlewares
app.use(express.json())
// our own custom middleware. the third thing is next which is a function that moves along to the next thing
app.use((req,res,next) => {
    console.log(`incoming request: ${req.method} ${req.url}`)
    // built in method res.locals
    res.locals.anything = '🚢'
    next()
})
// if you are getting posts from HTML forms
app.use(express.urlencoded({extended:false}))
// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'))

// custom middleware that only goes to a specific route
const middleWare = (req,res,next) => {
    console.log('i am route specific middleware 🚀')
    next()
}

// added the middleware just ot this specific route
app.get('/', middleWare, (req,res) => {
// you can send stuff to your routes by sing res.locals middleware
    console.log(res.locals)
    res.json({msg:'hello from the backend 🙋‍♀️'})
})

app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`listening on port: ${PORT} 🌽`)
})