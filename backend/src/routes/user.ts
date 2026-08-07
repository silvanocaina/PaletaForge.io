
import express, { Router } from 'express'
import {PrismaClient} from "../generated/prisma/client.js"
import { reply_status_400, reply_status_500 } from '../helpers/api_helper.js'
import { get_users_dto} from '../helpers/database_helper.js'
import { CreateUser } from '../schemas/user.js';
import { ZodError } from 'zod';
import { createPasswordHash } from '../helpers/argon2.js';

const router = Router();
const prisma = new PrismaClient()

// ##############################
// ###  Métodos para usuarios  ##
// ##############################


router.get('/usuarios', async (req, res) => {
  try {
    const users =  get_users_dto(prisma)
    res.status(200).json(users)
  }
  catch(e) {
    reply_status_500(res)
  }
})

// para criar um usuario
router.post('/usuarios', async (req, res) => {

  try {
    // validamos os dados recebidos do frontend
    const data = CreateUser.parse({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      about: req.body.about,
    })

    console.log(data);
    // Tentar gerar o hash
    const hash = await createPasswordHash(data.password);


    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        about: data.about ?? null,
        auth: {
          create: {
            hash: hash
          }
        }
      },
    })
    res.status(201).json({
      message: `Criado usuario ${data.name} com sucesso`,
      token: ""
    })
  }
  catch (error) {

    switch (error) {
      case error instanceof ZodError:
        // responde que é erro no cliente
        reply_status_400(res)
        break
      default:
        reply_status_500(res)
        break
    }
  }
})

// ###################################
// ###  Métodos para id de usuario  ##
// ###################################

router.get('/usuarios/:id', async (req, res) => {
  try {

  }
  catch(e) {

    reply_status_500(res)
  }
})

router.put('/usuarios/:id', async (req, res) => {
  try {

  }
  catch(e) {

  reply_status_500(res)
  }
})

router.patch('/usuarios/:id', (req, res) => {
  try {

  }
  catch(e) {

  reply_status_500(res)
  }
})

router.delete('/usuarios/:id', async (req, res) => {
  try {

  }
  catch(e) {

  reply_status_500(res)
  }
})

export default router;
