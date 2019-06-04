FROM node:8.14-alpine

EXPOSE 3000
WORKDIR /var/www/exam_api

RUN apt-get update \
    && apt-get install -y git \
    && yarn global add node-gyp
COPY package*.json ./
RUN yarn install
CMD [ "yarn", "start" ]
