const express = require('express')
const userController = require('./controllers/UserController')

let app = express.Router()

app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(`Connection from ${ip}`)
    res.send('It is working!')
});

app.post('/register', userController.create)

app.post('/login', userController.login)

app.post('/validate', (req, res) => {
    res.status(200).json({status : 'success', message : 'API reachable'})
})

app.post('/applogin', (req, res) => {
    console.log(req.body)
    res.status(200).json({status : 'success', message : 'Login successfull!', token : 'aSAJDOHoasidj19123JHDS'})
})

app.post('/appregister', (req, res) => {
    console.log(req.body)
    res.status(200).json({status : 'success', message : 'Registration successfull!'})
})

app.get('*', (req, res) => {
    res.status(404).send('Are you lost my child?')
})

module.exports = app;