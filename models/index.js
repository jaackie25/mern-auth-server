// require the mongoose package
const mongoose = require('mongoose')
// connection function 
const connect = () => {
    const MONGODB_URI = process.env.MONGODB_URI
    
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    const db = mongoose.connection

    db.once('open', () => {
        console.log(`ð MongoDB connection at ${db.host}: ${db.port}`)
    })

    db.on('error', (err) => {
        console.log('uh oh spaghetti-OHð')
        console.log(err)
    })
}


// export the connection function and models 
module.exports = {
    connect,
    User: mongoose.model('user', require('./User.js'))
}