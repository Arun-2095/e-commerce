FROM node:22-alpine

WORKDIR /

COPY server/package.json ./

RUN npm install

COPY server/ .

EXPOSE 2222

CMD [ "npm" , "start" ]