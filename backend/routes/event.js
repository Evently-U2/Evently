const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')

router.route('/list').get(controllers.event.eventList)
router.route('/:eventId').get(controllers.event.event)


module.exports = router