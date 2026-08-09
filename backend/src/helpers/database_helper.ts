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
export async function get_users_dto(prisma: PrismaClient) {
  const unsecure_users = await prisma.user.findMany();

  const secure_users = unsecure_users.map((user) => {
    return {
      id: user.id,
      name: user.name
    }
  })

  return secure_users
}

/**
 * Obtém um unico usuario pelo seu id
 * @param prisma o prisma
 * @param id id do usuario
 * @returns Retornar um usuario
 */
export async function get_single_user_dto(prisma: PrismaClient, id: string) {
  const unsecure_user = await prisma.user.findUniqueOrThrow({
    where: {
      id: id
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
