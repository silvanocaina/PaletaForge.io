import { PrismaClient, Prisma } from "../generated/prisma/client.js";
import {
  reply_status_400,
  reply_status_404,
  reply_status_409,
  reply_status_500,
} from "../helpers/api_helper.js";
import {
  get_single_user_dto,
  get_users_dto,
} from "../helpers/database_helper.js";
import { createPasswordHash } from "../helpers/argon2.js";
import { get_jwt_secret, JWT_SECRET_NAME } from "../helpers/env_helper.js";
import { CreateUser } from "../schemas/user.js";

import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

const router = Router();
const prisma = new PrismaClient();

// ##############################
// ###  Rotas para usuarios  ##
// ##############################

// Obtém todos os usuarios sanietizadas sem as informações sensiveis
router.get("/userlist", async (req, res) => {
  try {
    const users = await get_users_dto(prisma);
    res.status(200).json(users);
  } catch (e) {
    reply_status_500(res);
  }
});

// Para criar um novo usuario
router.post("/users", async (req, res) => {
  try {
    // validamos os dados recebidos do frontend
    const data = CreateUser.parse({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      about: req.body.about,
    });

    // Tentar gerar o hash
    const hash = await createPasswordHash(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.username,
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

    // Define o token seguro
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.status(201).json({
      message: `Criado usuario ${data.username} com sucesso`,
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
          reply_status_409(
            res,
            "Email ou username já esta sendo utilizado por outro usuario",
          );
          return;
      }
    }

    // resposta padrão
    reply_status_500(res);
  }
});

// Obtém um usuario especfico pelo id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await get_single_user_dto(prisma, req.params.id);

    res.status(200).json(user);
  } catch (error) {
    // console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2025": // ID do usuario não foi achado no banco de dados
          reply_status_404(
            res,
            `Usuario portador do id ${req.params.id} não consta no banco de dados`,
          );
          return;
        case "P2023": // ID não é valido
          reply_status_400(res, `Id ${req.params.id} não é valido`);
          return;
      }
    }
    reply_status_500(res);
  }
});

router.delete("/usuarios/:id", async (req, res) => {
  try {
  } catch (e) {
    reply_status_500(res);
  }
});

// Autenticar um usuario
router.post("/auth/login", (req, res) => {
  try {
  } catch (e) {
    reply_status_500(res);
  }
});

export default router;
