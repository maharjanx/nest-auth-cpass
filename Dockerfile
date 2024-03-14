FROM node:18

WORKDIR /nest-auth

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run", "start:dev"]