import { abort } from 'node:process';
import { PrismaClient } from '../generated/prisma/client.js'

// ##########################
// ## Data Transfer Object ##
// ##########################

/**
 * Obtém no banco de dados os usuarios de forma segura, com informações sensiveis excluidas
 * @param prisma o prisma
 * @returns Retornar array de usuarios prontos para ser transferido externamente
 */
export async function getUsersDto(prisma: PrismaClient) {
  const unsecure_users = await prisma.user.findMany();

  const secure_users = unsecure_users.map((user) => {
    return {
      id: user.id,
      name: user.name
    }
  })

  return secure_users
}

type GetSingleUserDtoOrAuthParams = {
  prisma: PrismaClient, id?: string, username?: string, email?: string
}

/**
 * Obtém um unico usuario pelo seu id
 * @param prisma o prisma
 * @param id id do usuario
 * @param username nome de usuario do usuario
 * @param email email do usuario
 * @returns Retornar um auth
 */
export async function getSingleUserDto({prisma, id, username, email} : GetSingleUserDtoOrAuthParams) {
  const unsecure_user = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
      email: email,
      name: username,
    }
  })

  const palletes_tonals = await prisma.palleteTonal.findMany({
    where: {
      authorID: unsecure_user.id
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      authorID: true,

    }
  })

  return {
    id: unsecure_user.id,
    name: unsecure_user.name,
    about: unsecure_user.about,
    pallete_tonals: palletes_tonals
  }
}

/**
 * Obtém o auth de um usuario
 * @param prisma o prisma
 * @param id id do usuario
 * @param username nome de usuario do usuario
 * @param email email do usuario
 * @returns Retornar um usuario
 */
export async function getAuth({ prisma, id, username, email }: GetSingleUserDtoOrAuthParams) {
  // variavel do id do usuario
  let userID = id;

  if (!id) { // se o id estiver indefinido, tentar buscar o id do usuario
  const unsecure_user = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      name: username,
    }
  })

    // Passar o id
    userID = unsecure_user.id;
  }

  // Tentar retornar o auth do usuario pelo userID
  return await prisma.auth.findUniqueOrThrow({
    where: {
      userID: userID
    }
  })
}
