const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => console.log(`API is running...`))

app.get('/', (req, res) => {
    res.send('It is working!')
});

app.post('/validate', (req, res) => {
    console.log(req.body)
    res.send('POST request sent successfully')
})

app.get('*', (req, res) => {
    res.status(404).send('Are you lost my child?')
})