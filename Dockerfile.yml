# Dockerfile CORRIGIDO

# 1. Imagem base
FROM node:22.16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN chown -R node:node /app

USER node

# 8. Expõe a porta
EXPOSE 3000

# 9. Define o comando padrão, que será executado como 'node'
CMD ["npm", "start"]