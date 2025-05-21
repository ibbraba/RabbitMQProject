FROM node:18-alpine

RUN apk add --no-cache bash
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["bash", "wait-for-it.sh", "rabbitmq:5672", "--", "npm", "start"]
