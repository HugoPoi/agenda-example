require('../environment')
const chalk = require('chalk')
const blue = chalk.blue
const red = chalk.red
const log = console.log
const agenda = require('../src/agenda')
const times = require('lodash.times')
const argv = require('yargs').argv

const { name, num, every } = argv

if (!(name && num)) {
  log(red('name and num args are required'))
  process.exit(1)
  return
}

log(blue(`queueing ${num} ${name} jobs`))

const queueTasks = []

agenda.on('ready', () => {
  times(num, () => {
    queueTasks.push(queue())
  })

  Promise.all(queueTasks).then(() => {
    log(blue('Jobs have been queued'))
    process.exit(0)
  }).catch((error) => {
    log(red('Error queueing jobs'))
    log(red(error.stack))
    process.exit(1)
  })
})


function queue () {
  return new Promise((resolve, reject) => {
    if(every){
      agenda.every(every, name, (error, job) => {
        if (error) return reject(error)
          resolve(job)
      })
    }else{
      agenda.now(name, (error, job) => {
        if (error) return reject(error)
          resolve(job)
      })
    }
  })
}
