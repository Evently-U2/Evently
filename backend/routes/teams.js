const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')

router.route('/create').post(controllers.team.createTeam)
router.route('/list/:eventID').get(controllers.team.teamsList)
router.route('/:teamID/:eventID').get(controllers.team.team)


module.exports = router