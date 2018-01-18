const Debug = require('debug')

class JobRunner {
  constructor (job) {
    this.job = job
    this.logger = Debug(`job:${this.job.id}`)
  }

  run () {
    this.log()
  }

  log () {
    this.logger('running')
    this.timeout = setTimeout(() => {
      this.log()
    }, 1000)
  }

  destroy () {
    if (this.timeout) clearTimeout(this.timeout)
  }
}

module.exports = JobRunner
