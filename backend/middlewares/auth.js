const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const auth = async (req, res, next) => {
  
    const { istoken, token, purpose, email, password } = req.body

    console.log("inside the auth controller",req.body)

    if(istoken == false)
    {
        next()
        return 
    }


    // if (!token.startsWith('Bearer ')) {

    //     throw new UnauthenticatedError('Unauthenticated')
    // }


    // const payload = token.split(' ')[1]
    const payload = token


    try {

        const decoded = jwt.verify(payload, process.env.JWT_SECRET)
        
        const { mongoId, email } = decoded
        console.log(mongoId,email)
        // if(purpose == "explore")
        // {

        //     res.status(StatusCodes.OK).json({

        //         isValid: true,
        //         //send data everytime
        //     })

        //     return //next whatever route
        // }
        

        req.body["mongoId"] =  mongoId
        
        next()
    
    } catch (error) {

        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = auth
