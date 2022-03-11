const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const models = require('./models')
const routes = require('./routes')
require('dotenv').config()

const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.listen(port, () => console.log(`API is running...`))

models.sequelize.sync().then(() => {
    console.log("Database is working!")
}).catch((err) => {
    console.log(err, 'Something wrong with the database!')
})

app.use('/', routes)