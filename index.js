const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express()
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => console.log(`API is running...`))

app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(`Connection from ${ip}`)
    res.send('It is working!')
});

app.post('/validate', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(`POST request from ${ip} with data: ${req.body}`)
    res.send('POST request sent successfully')
})

app.get('*', (req, res) => {
    res.status(404).send('Are you lost my child?')
})