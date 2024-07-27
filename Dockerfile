FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080

# npm run dev
CMD [ "npm" , "run", "dev" ]