FROM node:18-alpine

RUN apk add --no-cache bash
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
