FROM node:17-alpine as builder

WORKDIR /Users/anthonyengland/Desktop/ticket-tracker/client
COPY package*.json ./
RUN npm install npm update
COPY . .
RUN npm run build
ENV PATH="/Users/anthonyengland/Desktop/ticket-tracker/server/.env"
FROM nginx:1.19.0
WORKDIR /Users/anthonyengland/Desktop/ticket-tracker/client/public
RUN rm -rf ./*
COPY --from=builder /Users/anthonyengland/Desktop/ticket-tracker/client .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]