require('../environment')
const agenda = require('./agenda')

agenda.on('ready', () => {
  require('./jobs/job_1')
  require('./jobs/job_2')
  agenda.start()
})

agenda.on('complete', (job) => {
  console.log('Job finished', job.attrs)
})

agenda.on('fail', (error, job) => {
  console.error('Error in agenda job:', job.attrs.failReason, error)
  console.error('Error in agenda job details:', JSON.stringify(job.attrs))
})

function graceful () {
  agenda.stop(() => {
    process.exit(0)
  })
}

process.on('SIGTERM', graceful)
process.on('SIGINT', graceful)
