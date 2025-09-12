import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './models/user.js'

dotenv.config()
mongoose.connect(process.env.conString)
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

// app.post('/login', async (req, res) => {
//     let data = req.body

//     let emailFound = await db.collection('users').findOne({ email: data.email })
//     let passwordFound = await db.collection('users').findOne({ password: data.password })

//     if (emailFound) {
//         if (passwordFound) {
//             return res.send(emailFound);
//         } else {
//             return res.status(400).send('Invalid password!');
//         }
//     } else {
//         return res.status(400).send('Invalid email!');
//     }
// })

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// })

export default app