import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost:27017/signupData')
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/signup', async (req, res) => {
    let data = req.body

    let isPresent = await mongoose.connection.collection('signup').findOne({email: data.email})

    if(isPresent) {
        res.status(400).send('Email already exists!')
    } else {
        await mongoose.connection.collection('signup').insertOne({username: data.username, email: data.email, password: data.password})
        res.send(data);
    }
})

app.post('/login', async (req, res) => {
    let data = req.body

    let emailFound = await mongoose.connection.collection('signup').findOne({email: data.email})
    let passwordFound = await mongoose.connection.collection('signup').findOne({password: data.password})

    if(emailFound) {
        if(passwordFound) {
            return res.send(emailFound);
        } else {
            return res.status(400).send('Invalid password!');
        }
    } else {
        return res.status(400).send('Invalid email!');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})