FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

CMD ["npm", "start"]
