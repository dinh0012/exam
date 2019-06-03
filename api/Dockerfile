FROM node:8.14-alpine
WORKDIR /var/www/api
COPY package*.json ./
RUN npm install
EXPOSE 80
CMD [ "npm", "start" ]
