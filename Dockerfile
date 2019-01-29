FROM node:8-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ARG version=dev-unknown
ENV BUILD_VERSION=$version
RUN npm run generate

FROM nginx
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist .
