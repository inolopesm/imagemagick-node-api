FROM node:20

RUN apt update
RUN apt install imagemagick -y

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY main.js .

EXPOSE 80

CMD ["node", "main.js"]
