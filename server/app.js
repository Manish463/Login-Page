import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './models/user.js'
import jwt from 'jsonwebtoken'

dotenv.config()
let uri = process.env.conString
let KEY = process.env.jwtSecret
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

app.post('/', async (req, res) => {
    let {token} = req.body
    try {
        let verified = jwt.verify(token, KEY)
        let result = await User.findOne({ email: verified.email })
        res.status(200).send(result)
    } catch (error) {
        res.status(401).send('Unauthorized request')
    }
})

app.post('/signup', async (req, res) => {
    let data = req.body
    let isPresent = await User.findOne({ email: data.email })
    try {
        if (isPresent) {
            res.status(400).send('Email already exists!')
        } else {
            let result = await User.create({ username: data.username, email: data.email, password: data.password })
            const payload = { id: result._id, email: result.email }
            const token = jwt.sign(payload, KEY, { expiresIn: '1h' })
            res.status(200).json({ result: result, token: token })
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.post('/login', async (req, res) => {
    let data = req.body

    let result = await User.findOne({ $and: [{ email: data.email }, { password: data.password }] })
    if (result) {
        const payload = { id: result._id, email: result.email }
        const token = jwt.sign(payload, KEY, { expiresIn: '1h' })
        res.status(200).json({ result: result, token: token })
    } else {
        res.status(401).send("Invalid email or password!");
    }
})

export default app