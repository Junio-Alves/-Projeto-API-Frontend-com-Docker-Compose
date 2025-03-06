FROM node:latest

# Define o diretório de trabalho no container
WORKDIR /api

# Copia os arquivos do projeto para dentro do container
COPY . .

RUN rm -rf node_modules
# Instala as dependências
RUN npm i
RUN npm run build

# Expõe a porta da API
EXPOSE 3004

# Usa PM2 para iniciar a aplicação
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]

