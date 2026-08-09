# PaletaForge.io

## Sobre o Projeto

Projeto de paleta de cores, em full stack para testar meus conhecimento teorico na pratica

## Tecnologias
As tecnologias usada no projeto
### Frontend

No lado cliente
</br>

[![My Skills](https://skillicons.dev/icons?i=nodejs,react)](https://skillicons.dev)
### Backend

No lado servidor
</br>

[![My Skills](https://skillicons.dev/icons?i=typescript,nodejs,express,prisma,mongodb)](https://skillicons.dev)
</hr>

Outras libs
* argon2: para derivar as senhas, aplicar um custo computacional para tentativa de senha, difucultando ataque de força bruta por ASIC/GPU com a utilização da variante argon2id
* zod: para validação de dados

## Avisos

### Banco de Dados

Você tera que usar seu proprio banco de dados para testar o projeto, mas fique tranquilo, no site oficial do MongoDB é gratuito criar um cluster

### Deploy do Site

Não há um deploy do projeto ainda por questão do backend


## Como configurar
### FrontEnd
### BackEnd
⚙️ Como configurar o seu arquivo de ambiente
```
backend/.env

# coloque a url do cluster do seu MongoDB
DATABASE_URL = ""
```
⚙️ Como configurar o projeto
```
# Entra na pasta do backend
cd backend

# Instale os pacotes
npm i

# Gere a abstração do schema do Prisma para a pasta src
npx prisma generate

# Configurar o schema do Prisma no seu banco de dados MongoDB
npx prisma db push
```
▶️ Como rodar
```
# Para rodar em desenvolvimento
npm run dev

# Para buildar
npm run build

# Para rodar em produção
npm run start
```

## Roadmap
