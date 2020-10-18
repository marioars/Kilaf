require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const port = process.env.PORT || 3000
const route = require('./routes')
const {errorHandler} = require('./middleware/errorHandler')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const io = require('socket.io').listen(5000)
const socket = require('./config/socket')
const cron = require('node-cron')
const resolveBids = require('./cron/cronFunctions')

socket.start(io)

app
    .use(cors())
    .use(fileUpload())
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(route(io))
    .use(errorHandler)


// CRON Function (Runs every minute 00-59)
cron.schedule('0-59 * * * *', () => {
    resolveBids()
})

module.exports = app