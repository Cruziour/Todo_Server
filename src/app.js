import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Task } from './models/task.models.js'
import TaskRouter from './routes/task.route.js'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/v1/task', TaskRouter);

export default app