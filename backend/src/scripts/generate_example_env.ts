import { randomBytes } from 'node:crypto'
import { writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// monta o caminho do path
const path_env = path.join(__dirname, '..', '..', 'example.env')

const existEnv = existsSync(path_env)

if (!existEnv) {
  // gerar a chave aleatoria
  const JwtSecret = randomBytes(32).toString('base64');

  // conteudo do exemplo de arquivo .env
  const lines = [
    'DATABASE_URL=""',
    `JWT_SECRET="${JwtSecret}"`
  ]
  writeFileSync(path_env, lines.join('\n'))
}
else {
  console.log("Erro: Já existe um exemplo de arquivo de configuração")
}
