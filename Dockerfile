FROM node:8-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist .
