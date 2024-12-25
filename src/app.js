import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import activity from './middlewares/activity.js'
import TaskRouter from './routes/task.route.js'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use(activity('log.txt'))

// Routes
app.use('/api/v1/task', TaskRouter);

export default app