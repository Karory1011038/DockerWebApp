FROM node:14-alpine

WORKDIR /client/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "server.js"]
