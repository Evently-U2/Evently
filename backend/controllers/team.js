const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')
const Errors = require('../errors/index')


const createTeam = async (req, res) => {

    const team = await Models.Team.create({ ...req.body })

    return res.status(StatusCodes.CREATED).json({

        team,
        isValid: true,
    })
}


const teamsList = async (req, res) => {

    const { eventID } = req.params


    let result = Models.Team.find({event: eventID});

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

    const teamsList = await result;

    return res.status(StatusCodes.OK).json({ 
        teamsList, 
        nbHits: teamsList.length,
        isValid: true 
    });

}



const team = async (req, res) => {

    const { teamID, eventID } = req.params

    const team = await Models.Team.findOne({ _id: teamID, event: eventID })


    if (!team) {

      throw new Errors.NotFoundError('Team not found')
    
    }


    res.status(StatusCodes.OK).json({

            team,
            isValid: true,
    })

}

module.exports = {
    
    createTeam,
    teamsList,
    team
}