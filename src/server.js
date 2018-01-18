const Arena = require('bull-arena')
const express = require('express')
const logger = require('morgan')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(logger('dev'))
router.use(bodyParser.urlencoded({extended: true}))

const arena = Arena({
  queues: [
    {
      name: 'job-1',
      hostId: `pid: ${process.pid.toString()}`
    }
  ]
}, { disableListen: true })

router.use('/', arena)

module.exports = router
