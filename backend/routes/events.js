const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')

router.route('/create').post(controllers.event.createEvent)
router.route('/list').get(controllers.event.eventsList)
router.route('/:eventID').get(controllers.event.event)


module.exports = router