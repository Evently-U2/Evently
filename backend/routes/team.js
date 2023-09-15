const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')

router.route('/teamList/:eventId').get(controllers.teams.teamList)
router.route('/:teamId/:eventID').get(controllers.teams.team)


module.exports = router