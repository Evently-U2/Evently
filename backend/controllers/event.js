const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')

const Models = require('../models/index')
const Errors = require('../errors/index')


const createEvent = async (req, res) => {

    const event = await Models.Event.create({ ...req.body })


    return res.status(StatusCodes.CREATED).json({

        event,
        isValid: true,
    })
}

const eventsList = async (req, res) => {

    let result = Models.Event.find({});

    
    // if (sort) {
        //     const sortList = sort.split(',').join(' ');
        //     result = result.sort(sortList);
        // } else {
    result = result.sort('createdAt');
            // }
            
            // if (fields) {
                //     const fieldsList = fields.split(',').join(' ');
                //     result = result.select(fieldsList);
                // }
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    result = result.skip(skip).limit(limit);
    
    const eventsList = await result;

                
    res.status(StatusCodes.OK).json({ 
        eventsList, 
        nbHits: eventsList.length,
        isValid: true 
    });

}



const event = async (req, res) => {
    
    const { eventID } = req.params
   
    const event = await Models.Event.findOne({ _id: eventID })


    if (!event) {

      throw new Errors.NotFoundError('Event not found')
    
    }


    res.status(StatusCodes.OK).json({

            event,
            isValid: true,
    })

}

module.exports = {
    
    createEvent,
    eventsList,
    event
}