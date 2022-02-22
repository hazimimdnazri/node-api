const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express()
require('dotenv').config()

const connection = mysql.createPool({
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
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?'
    let query = mysql.format(selectQuery,["users","sn", req.body.serial_number])
    connection.query(query,(err, data) => {
        if(err){
            console.error(err)
            return
        }
        if(Object.keys(data).length !== 0  ){
            if(data[0].computer_id != req.body.machine_id){
                res.status(200).json({status : 'error', message : 'The serial number is not registered to this machine.'})
            } else {
                res.status(200).json({status : 'success', message : 'The serial number is registered.'})
            }
        } else {
            res.status(200).json({status : 'error', message : 'The serial number does not exist.'})
        }
    });
})

app.get('*', (req, res) => {
    res.status(404).send('Are you lost my child?')
})