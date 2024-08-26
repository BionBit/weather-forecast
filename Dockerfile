FROM node:latest

WORKDIR /web-app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]