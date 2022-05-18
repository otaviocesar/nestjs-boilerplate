FROM node:12.13-alpine As production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=production

COPY . .

RUN npm run build
 
CMD ["node", "dist/main"]