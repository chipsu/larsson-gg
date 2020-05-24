FROM node:12-alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
ARG version=dev-unknown
ENV BUILD_VERSION=$version
RUN yarn generate

FROM nginx
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist .
