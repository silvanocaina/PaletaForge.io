import Argon2 from 'argon2'

export async function createPasswordHash(plainPassword: string) {
  try {
    const hash = await Argon2.hash(plainPassword, {
      type: Argon2.argon2id,
      memoryCost: 102400,
      timeCost: 3,
      parallelism: 1
    });
    return hash;
  } catch (error) {
    throw new A2CreateHashError("Erro ao gerar hash");
  }
}


// Erro costumizado, para ser possivel filtrar o erro posteriomente
export class A2CreateHashError extends Error {
  constructor(message: string) {
    super(message)
  }
}
