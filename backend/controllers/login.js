const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')
const Errors = require('../errors/index')


const organizer = async (req, res) => {

    const { mongoId, email, password } = req.body

    if(mongoId)
    {
        const organizer = await Models.Organizer.findOne({ _id: mongoId })

        organizer["password"] = "secret"

        res.status(StatusCodes.OK).json({

                organizer,
                isValid: true,
                token: req.body.token
        })

    }
  
    const organizer = await Models.Organizer.findOne({ email })

    if (!organizer) {

      throw new Errors.UnauthenticatedError('Email not found')
    
    }
    
    const isPasswordCorrect = await organizer.comparePassword(password)
    
    if (!isPasswordCorrect) {
    
        throw new Errors.UnauthenticatedError('Password is incorrect')
    
    }

    const token = organizer.createJWT()

    organizer["password"] = "secret"

    organizer["password"] = "secret"

    // res.cookie('evently-jwt-organizer', token, { httpOnly: false, maxAge: process.env.JWT_LIFETIME * 1000 })

    res.status(StatusCodes.OK).json({

            organizer,
            isValid: true,
            token

    })
}



const participant = async (req, res) => {

    const { mongoId, email, password } = req.body

    if(mongoId)
    {
        const participant = await Models.Participant.findOne({ _id: mongoId })

        participant["password"] = "secret"

        res.status(StatusCodes.OK).json({

                participant,
                isValid: true,
                token: req.body.token
        })

    }

    const participant = await Models.Participant.findOne({ email })
    
    if (!participant) {

      throw new Errors.UnauthenticatedError('Email not found')
    
    }
    
    const isPasswordCorrect = await participant.comparePassword(password)


    if (!isPasswordCorrect) {
        
        throw new Errors.UnauthenticatedError('Password is incorrect')

    }

    
    const token = participant.createJWT()

    participant["password"] = "secret"

    // res.cookie('evently-jwt-participant', token, { httpOnly: true, maxAge: process.env.JWT_LIFETIME * 1000 })

    res.status(StatusCodes.OK).json({

            participant,
            isValid: true,
            token
        
    })
}

module.exports = {
    
    organizer,
    participant
}