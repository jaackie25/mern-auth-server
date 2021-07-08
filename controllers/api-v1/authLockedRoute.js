const jwt = require('jsonwebtoken')
const db = require('../../models')

const authLockedRoute = async (req, res, next) => {
    try {
    // get the jwt from authorization headers
    // part of the http standard
        const authHeaders = req.headers.authorization 
    // verify the jwt -- if the jwt is not valid then it will throw to the catch
        const decoded = jwt.verify(authHeaders, process.env.JWT_SECRET)
    // find the user from the db -- if goes here then they are successfully verified
    // remember that we included the user id in the payload so we can call it here
        const foundUser = await db.User.findById(decoded.id)
    // mount the user on the res.locals
    // mounting the user from our DB to res.locals
        res.locals.user = foundUser
        next()
    } catch(err){
        console.log(err)
        res.status(401).json({msg: 'you are not allowed to be here!'})
    }
}

module.exports = authLockedRoute
