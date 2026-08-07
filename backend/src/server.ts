import dotenv from 'dotenv/config'
import express from 'express'
import userRoutes from './routes/user.js'

process.env.DATABASE_URL // carrega

const app = express();
app.use(express.json()) // Faz o json do corpo ser lido

app.use('/', userRoutes);

app.listen(3000)
