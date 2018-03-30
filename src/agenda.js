const Agenda = require('agenda')
const agendaConfig = {
  db: {address: process.env.MONGO_URL},
  defaultConcurrency: process.env.AGENDA_DEFAULT_CONCURRENCY,
  defaultLockLimit: process.env.AGENDA_DEFAULT_CONCURRENCY,
  maxConcurrency: 1,
  lockLimit: 1
}

console.log('Starting agenda with config:', agendaConfig)
const agenda = new Agenda(agendaConfig)

module.exports = agenda
