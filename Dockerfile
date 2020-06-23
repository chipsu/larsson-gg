FROM node:12-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG version=dev-unknown
ENV BUILD_VERSION=$version
RUN npm run generate

FROM nginx:1-alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist .
