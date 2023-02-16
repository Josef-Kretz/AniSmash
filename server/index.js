const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('../config/database')
const flash = require('express-flash')

const mainRoutes = require('../routes/main')
const apiRoutes = require('../routes/api')

require('dotenv').config({path: './config/.env'})
require('../config/passport')(passport)

connectDB()

const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create(mongoose.connection),
        //enable before pushing to production
        // cookie: {
        //     sameSite: 'none',
        //     secure: true
        // }
    })
  );

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/api', apiRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server listening on: ', process.env.PORT || 3001)
})