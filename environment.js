const nodeEnv = process.env.NODE_ENV || 'development'

if (nodeEnv === 'development') {
  require('dotenv').load()
}
