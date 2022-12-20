#image from docker hub
FROM node:17-alpine as builder
# directory to compy from 
WORKDIR /Users/anthonyengland/Desktop/ticket-tracker/client
# Copy the package json from the directory above this comment 
COPY package*.json ./
# installing all dependencies within package json
RUN npm install npm update
# copy all files in working directory
COPY . .
# Running build script inside of package json for react 
RUN npm run build
#Accesses environment variables by mapping to the directory
ENV PATH="/Users/anthonyengland/Desktop/ticket-tracker/server/.env"
# A server optimizing the build script for deployment
FROM nginx:1.19.0
#
WORKDIR /Users/anthonyengland/Desktop/ticket-tracker/client/public
#allows the container to run and stop without creating the container over and over 
RUN rm -rf ./*
#Mapping the front end to the server 
COPY --from=builder /Users/anthonyengland/Desktop/ticket-tracker/client .
#Turning on nginx and turning off docker daemon
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]