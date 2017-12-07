const agenda = require('../agenda')
const JobRunner = require('./job_runner')

agenda.define('job-1', (job, done) => {
  const jobRunner = new JobRunner(job)
  jobRunner.run()
  setTimeout(() => {
    jobRunner.destroy()
    done()
  }, 60000)
})
