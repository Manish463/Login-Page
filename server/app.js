import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './models/user.js'

dotenv.config()
let uri = process.env.conString
mongoose.connect(uri)
    .then(() => {
        console.log("Successfully connected");
    })
    .catch((err) => {
        console.error("Failed to connect", err);
    });

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.post('/signup', async (req, res) => {
    let data = req.body
    let isPresent = await User.findOne({ email: data.email })
    try {
        if (isPresent) {
            res.status(400).send('Email already exists!')
        } else {
            let newDoc = await User.create({ username: data.username, email: data.email, password: data.password })
            res.status(200).send(newDoc)
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.post('/login', async (req, res) => {
    let data = req.body

    let result = await User.findOne({ $and: [{ email: data.email }, { password: data.password }] })
    if (result) {
    res.send(result);
    } else {
        res.status(401).send("Invalid email or password!");
    }
})

export default app