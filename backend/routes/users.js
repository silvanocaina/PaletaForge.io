import express from 'express'
import {PrismaClient} from "../generated/prisma/client.js"
import { reply_status_500 } from '../helpers/api_helper'
import { get_users_dto} from '../helpers/database_helper.js'

const app = express();
const prisma = new PrismaClient()

// ##############################
// ###  Métodos para usuarios  ##
// ##############################

app.get('/usuarios', async (req, res) => {
  try {
    const users =  get_users_dto(prisma)
    res.status(200).json(users)
  }
  catch(e) {
    reply_status_500(res)
  }
})

app.post('/usuarios', async (req, res) => {

  try {
    await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,

      }
    })
    res.status(201).json({
      message: "Criado com sucesso"
    })
  }
  catch(e) {
    reply_status_500(res)
  }
})

// ###################################
// ###  Métodos para id de usuario  ##
// ###################################

app.get('/usuarios/:id', async (req, res) => {
  try {

  }
  catch(e) {

    reply_status_500(res)
  }
})

app.put('/usuarios/:id', async (req, res) => {
  try {

  }
  catch(e) {

  reply_status_500(res)
  }
})

app.patch('/usuarios/:id', (req, res) => {
  try {

  }
  catch(e) {

  reply_status_500(res)
  }
})

app.delete('/usuarios/:id', async (req, res) => {
  try {

  }
  catch(e) {

  reply_status_500(res)
  }
})
