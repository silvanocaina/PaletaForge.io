import { PrismaClient } from "../generated/prisma/client.js";

// ##########################
// ## Data Transfer Object ##
// ##########################

/**
 * Obtém no banco de dados os usuarios de forma segura, com informações sensiveis excluidas
 * @param {PrismaClient} prisma
 * @returns {object[]} Retornar array de usuarios prontos para ser transferido externamente
 */
export async function get_users_dto(prisma) {
  const unsecure_users = await prisma.user.findMany();

  const secure_users = unsecure_users.map((user) => {
    return {
      id: user.id,
      name: user.name
    }
  })
}
