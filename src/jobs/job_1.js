const Queue = require('bull')
const queue = new Queue('job-1', process.env.REDIS_URL)
const JobRunner = require('./job_runner')

queue.process(5, function (job, done) {
  const jobRunner = new JobRunner(job)
  jobRunner.run()
  setTimeout(() => {
    jobRunner.destroy()
    done()
  }, 10000)
})
