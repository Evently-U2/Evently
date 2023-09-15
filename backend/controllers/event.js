const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')
const Errors = require('../errors/index')


const eventList = async (req, res) => {


    let result = await Models.Event.find({});

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    // 23
    // 4 7 7 7 2

    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
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