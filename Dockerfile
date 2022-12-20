FROM node:16-alpine

WORKDIR /home/node

COPY --chown=node package*.json ./

RUN npm ci

COPY --chown=node . .

CMD npm run start