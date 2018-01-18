require('../environment')
const chalk = require('chalk')
const blue = chalk.blue
const red = chalk.red
const log = console.log
const Queue = require('bull')
const times = require('lodash.times')
const argv = require('yargs').argv

const { name, num } = argv

if (!(name && num)) {
  log(red('name and num args are required'))
  process.exit(1)
  return
}

log(blue(`queueing ${num} ${name} jobs`))

const queueTasks = []

times(num, () => {
  const job = queue()
  console.log('debug job', job)
  queueTasks.push(job)
})

Promise.all(queueTasks).then(() => {
  log(blue('Jobs have been queued'))
  process.exit(0)
}).catch((error) => {
  log(red('Error queueing jobs'))
  log(red(error.stack))
  process.exit(1)
})


function queue () {
  const job1Queue = new Queue('job-1', process.env.REDIS_URL)
  return job1Queue.add({})
}
