import dotenv from 'dotenv/config'
import express from 'express'
import userRoutes from './routes/user.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import https from 'https'
import fs from 'fs'
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'https://localhost:5173', // URL exata do seu React
  credentials: true                // Permite o envio e recebimento de cookies
}));
app.use(express.json()) // Faz o json do corpo ser lido
app.use(cookieParser()); // Necessário para ler cookies nas requisições

app.use('/', userRoutes);

https.createServer({
  key: fs.readFileSync( path.join(__dirname,'..','..','certs','localhost+2-key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'..','..','certs','localhost+2.pem'))
},app).listen(3000)
