import express, { Router } from "express";
import { PrismaClient, Prisma } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import {
  reply_status_400,
  reply_status_409,
  reply_status_500,
} from "../helpers/api_helper.js";
import { get_users_dto } from "../helpers/database_helper.js";
import { CreateUser } from "../schemas/user.js";
import { ZodError } from "zod";
import { createPasswordHash } from "../helpers/argon2.js";
import { get_jwt_secret, JWT_SECRET_NAME } from "../helpers/env_helper.js";

const router = Router();
const prisma = new PrismaClient();

// ##############################
// ###  Métodos para usuarios  ##
// ##############################

// Obtém todos os usuarios sanietizadas sem as informações sensiveis
router.get("/usuarios", async (req, res) => {
  try {
    const users = get_users_dto(prisma);
    res.status(200).json(users);
  } catch (e) {
    reply_status_500(res);
  }
});

// ############################
// ##  Métodos para usuario  ##
// ############################

// para criar um usuario
router.post("/usuario", async (req, res) => {
  try {
    // validamos os dados recebidos do frontend
    const data = CreateUser.parse({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      about: req.body.about,
    });

    // Tentar gerar o hash
    const hash = await createPasswordHash(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        about: data.about ?? null,
        auth: {
          create: {
            hash: hash,
          },
        },
      },
    });

    const token = jwt.sign({ id: newUser.id }, get_jwt_secret(), {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: `Criado usuario ${data.name} com sucesso`,
      token: token,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // responde que é erro no cliente
      reply_status_400(res);
      return;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002": // Email ou username ja sendo utilizado por outra pessoas
          reply_status_409(res,'Email ou username já esta sendo utilizado por outro usuario');
          return;
      }
    }

    // resposta padrão
    reply_status_500(res);
  }
});

// ###################################
// ###  Métodos para id de usuario  ##
// ###################################

router.get("/usuarios/:id", async (req, res) => {
  try {
  } catch (e) {
    reply_status_500(res);
  }
});

router.put("/usuarios/:id", async (req, res) => {
  try {
  } catch (e) {
    reply_status_500(res);
  }
});

router.patch("/usuarios/:id", (req, res) => {
  try {
  } catch (e) {
    reply_status_500(res);
  }
});

router.delete("/usuarios/:id", async (req, res) => {
  try {
  } catch (e) {
    reply_status_500(res);
  }
});

export default router;
