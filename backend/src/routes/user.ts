import { PrismaClient, Prisma } from "../generated/prisma/client.js";
import { reply } from "../helpers/api_helper.js";
import {
  getAuth,
  getSingleUserDto,
  getUsersDto,
} from "../helpers/database_helper.js";
import { createPasswordHash, verifyPassword } from "../helpers/argon2.js";
import { get_jwt_secret, JWT_SECRET_NAME } from "../helpers/env_helper.js";
import { AuthUser, CreateUser } from "../schemas/user.js";

import { Router } from "express";
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
    const users = await getUsersDto(prisma);
    res.status(200).json(users);
  } catch (e) {
    reply({ res: res, status: 500, message: "Erro no Servidor" });
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
      reply({ res: res, status: 400, message: "Erro no cliente" });
      return;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002": // Email ou username ja sendo utilizado por outra pessoas
          reply({
            res: res,
            status: 409,
            message:
              "Email ou username já esta sendo utilizado por outro usuario",
          });
          return;
      }
    }

    // resposta padrão
    reply({ res: res, status: 500, message: "Erro no Servidor" });
  }
});

// Obtém um usuario especfico pelo id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await getSingleUserDto({ prisma: prisma, id: req.params.id });

    res.status(200).json(user);
  } catch (error) {
    // console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2025": // ID do usuario não foi achado no banco de dados
          reply({
            res: res,
            status: 404,
            message: `Usuario portador do id ${req.params.id} não consta no banco de dados`,
          });
          return;
        case "P2023": // ID não é valido
          reply({
            res: res,
            status: 400,
            message: `Id ${req.params.id} não é valido`,
          });
          return;
      }
    }
    reply({ res: res, status: 500, message: "Erro no Servidor" });
  }
});

router.delete("/usuarios/:id", async (req, res) => {
  try {
  } catch (e) {
    reply({ res: res, status: 500, message: "Erro no Servidor" });
  }
});

// Autenticar um usuario
router.post("/auth/login", async (req, res) => {
  try {
    // Pega a data/hora de agora
    const dateNow = new Date();

    // validamos os dados recebidos do frontend
    const data = AuthUser.parse({
      email: req.body.email,
      password: req.body.password,
    });

    // Temtar pegar o Auth do Usuario
    const auth = await getAuth({ prisma: prisma, email: req.body.email });

    // Analiza se não há tempo de espera ou se o tempo de espera passou
    if (!auth.lockedUntil || auth.lockedUntil <= dateNow) {


      // Verifica a Senha
      if (await verifyPassword(auth.hash, req.body.password)) {
        // Reseta
        await prisma.auth.update({
          where: {
            id: auth.id,
          },
          data: {
            updatedAt: dateNow,
            failedAttempts: 0,
            lockedUntil: null,
          },
        });

        const token = jwt.sign({ id: auth.userID }, get_jwt_secret(), {
          expiresIn: "7d",
        });

        // Define o token seguro
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: true,
        });

        reply({
          res: res,
          status: 201,
          message: `email ${data.email} autenticado com sucesso`,
        });
      } else {


        // Analiza as tentativas de login
        if (auth.failedAttempts > 4) {
          // caso passe do limite
          const lockedUntil = dateNow;
          lockedUntil.setMinutes(dateNow.getMinutes() + 15);

          await prisma.auth.update({
            where: {
              id: auth.id,
            },
            data: {
              failedAttempts: 0, // Reseta as tentativas
              lockedUntil: lockedUntil, // Seta agora + 15 minutos
            },
          });

          // Adiciona o Header Retry-After de 15 minutos
          res.setHeader('Retry-After', 15 * 60);

          reply({res: res, status: 429, message: 'Você precisa esperar 15 minutos'})
        } else {
          // caso ainda ta dentro do limite
          // acrescentar uma tentativa
          await prisma.auth.update({
            where: {
              id: auth.id,
            },
            data: {
              failedAttempts: auth.failedAttempts + 1,
            },
          });

          // Resposta de erro não autorizado
          reply({res: res, status: 401, message: `Você tem mais ${ 5 - auth.failedAttempts} tentativas`})
        }


      }
    } else {
      const seconds = Math.ceil((auth.lockedUntil.getTime() - dateNow.getTime()) / 1000);
      console.log(seconds )
      // Adiciona o Header Retry-After
        res.setHeader('Retry-After', seconds);

      // Erro de muitas requisição
      reply({res: res, status: 429, message: `Você precisa esperar ${Math.ceil(seconds / 60)} minutos`})
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2025": // ID do usuario não foi achado no banco de dados
          reply({
            res: res,
            status: 404,
            message: `Usuario portador do email não consta no banco de dados`,
          });
          return;
      }
    }
    reply({ res: res, status: 500, message: "Erro no Servidor" });
  }
});

export default router;
