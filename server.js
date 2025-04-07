const express = require("express")
const bodyParser = require('body-parser');
const app = express()
require('dotenv').config()
const db = require('./db')
const userRoutes = require('./Routes/userRoutes')

app.use(bodyParser.json())

const auth = require('./Auth')
const User = require('./models/User')
const passport = require('passport')


const localauthmiddleware = passport.authenticate('local', {session: false})


// Middleware
const printdate = (req, res, next) => {
    const currDate = new Date();
    console.log(currDate.toDateString())
    next()
}

app.get('/', printdate, (req, res) => {
    res.send("this is main page")
})

app.use(passport.initialize());


app.use('/users',   userRoutes)




app.listen("7000", () => {
    console.log("app is running at 7000")
})






