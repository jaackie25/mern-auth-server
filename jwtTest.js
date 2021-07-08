const jwt = require('jsonwebtoken')

// does not need async/await but need try and catch because there are a lot of errs

const jwtTest = () => {
    try{
    // user login process: 

    // create the data payload
        const payload = {
            name: 'weston',
            id:5
        }
    // signing the jwt token 
    // first arg is payload, the secret, and then expiration
        const token = jwt.sign(payload, 'This is my secret', {expiresIn: 60 * 60})
        console.log(token)
    // request to a route that needs authentication 
    // request to server:

    // decode the incoming jwt
    const decoded = jwt.verify(token, 'This is my secret' )
    console.log(decoded)
    } catch(err) {
        console.log(err)
    }
}

jwtTest()