FROM node:14.18.1-buster

WORKDIR /code

COPY package.json .

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["npm", "start"]