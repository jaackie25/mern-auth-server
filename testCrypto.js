const bcrypt = require('bcryptjs')

const cryptoTest = async () => {
    try{
    // test password
        const password ='hello'
    // specify the salt rounds
        const salt = 12
     // hash the password
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)

    // when checking user login we have to match the password
        const match = await bcrypt.compare('hello', hashedPassword)
        console.log('match:', match)
    } catch (error){
        console.log(error)
    }

}

cryptoTest()