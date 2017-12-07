require('../environment')
const http = require('http')
const app = require('./server')

const port = process.env.PORT || 3000
const server = http.createServer(app).listen(port, () => {
  console.log(`Express server on ${port}`)
})

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('graceful exit')
    process.exit(0)
  })
})
