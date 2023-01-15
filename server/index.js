const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('../config/database')

const mainRoutes = require('../routes/main')
const apiRoutes = require('../routes/api')

require('dotenv').config({path: './config/.env'})

connectDB()

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl : process.env.DBSTRING})
    })
  );

app.use('/', mainRoutes)
app.use('/api', apiRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server listening on: ', process.env.PORT || 3001)
})