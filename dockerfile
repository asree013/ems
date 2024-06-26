FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm i -f

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]