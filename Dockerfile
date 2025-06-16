FROM node:20-alpine

RUN apk add --no-cache bash

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV production

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

COPY wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

CMD ["/bin/bash", "/app/wait-for-db.sh"]