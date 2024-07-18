FROM node:20

WORKDIR /app-server

COPY *.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]