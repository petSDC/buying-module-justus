FROM node:6.13.0

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "server/server.js"]
