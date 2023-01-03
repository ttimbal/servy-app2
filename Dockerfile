FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

RUN npm run build
#CMD ["npm","run","dev"]
CMD ["npm","run","start"]