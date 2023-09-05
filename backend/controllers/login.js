const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')
const Errors = require('../errors/index')


const organizer = async (req, res) => {

    const { email, password } = req.body
  
    const organizer = await Models.Organizer.findOne({ email })

    if (!organizer) {

      throw new Errors.UnauthenticatedError('Email not found')
    
    }
    
    const isPasswordCorrect = await organizer.comparePassword(password)
    
    if (!isPasswordCorrect) {
    
        throw new Errors.UnauthenticatedError('Password is incorrect')
    
    }

    const token = organizer.createJWT()

    res.cookie('evently-jwt-organizer', token, { httpOnly: true, maxAge: process.env.JWT_LIFETIME * 1000 })

    res.status(StatusCodes.OK).json({

            ...req.body,
            isValid: true,
            token

    })
}



const participant = async (req, res) => {

    const { email, password } = req.body
  
    const participant = await Models.Participant.findOne({ email })
    
    if (!participant) {

      throw new Errors.UnauthenticatedError('Email not found')
    
    }
    
    const isPasswordCorrect = await participant.comparePassword(password)
    
    if (!isPasswordCorrect) {
        
        throw new Errors.UnauthenticatedError('Password is incorrect')
    
    }

    const token = participant.createJWT()

    res.cookie('evently-jwt-participant', token, { httpOnly: true, maxAge: process.env.JWT_LIFETIME * 1000 })

    res.status(StatusCodes.OK).json({

            ...req.body,
            isValid: true,
            token
        
    })
}

module.exports = {
    
    organizer,
    participant
}