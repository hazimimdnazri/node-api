const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const models = require('./models')
const userController = require('./controllers/UserController')
require('dotenv').config()

const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => console.log(`API is running...`))

models.sequelize.sync().then(() => {
    console.log("Database is working!")
}).catch((err) => {
    console.log(err, 'Something wrong with the database!')
})

app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(`Connection from ${ip}`)
    res.send('It is working!')
});

app.post('/create', userController.create)

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