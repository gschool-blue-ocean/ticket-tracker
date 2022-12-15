FROM node:16

WORKDIR /Users/anthonyengland/Desktop/ticket-tracker/server

COPY package*.json ./

RUN npm install npm update

COPY . .

EXPOSE 6001

EXPOSE 5432:5432

CMD ["node", "server.js"]