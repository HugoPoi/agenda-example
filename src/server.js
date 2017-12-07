const agenda = require('./agenda')
const express = require('express')
const Agendash = require('agendash')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.json({message: 'ok'}))

app.use('/agendash', Agendash(agenda))

module.exports = app
