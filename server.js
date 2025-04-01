const express = require("express")
const bodyParser = require('body-parser');
const app = express()
require('dotenv').config()
const db = require('./db')
const userRoutes = require('./Routes/userRoutes')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("this is main page")
})


app.use('/users', userRoutes)


app.listen("7000", () => {
    console.log("app is running at 7000")
})






