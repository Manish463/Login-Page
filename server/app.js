import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './models/user.js'

let port = process.env.conString || 3000
dotenv.config()
mongoose.connect(port)
    .then(() => {
        console.log("Successfully connected");
    })
    .catch((err) => {
        console.error("Failed to connect", err);
    });

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.send('Hello World!')
})

app.post('/signup', async (req, res) => {
    let data = req.body
    let isPresent = await User.find({ email: data.email })
    try {
        if (isPresent.length > 0) {
            res.status(400).send('Email already exists!')
        } else {
            let newDoc = await User.create({ username: data.username, email: data.email, password: data.password })
            res.send(newDoc);
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error: error.message})
    }
})

app.post('/login', async (req, res) => {
    let data = req.body

    let result = await User.find({ $and: [{ email: data.email }, { password: data.password }] })

    if (result.length > 0) {
        if (result[0].password === data.password) {
            return res.send(emailFound);
        } else {
            return res.status(400).send('Invalid password!');
        }
    } else {
        return res.status(400).send('Invalid email!');
    }
})

export default app