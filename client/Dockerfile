FROM node:15.3.0-alpine3.10

LABEL maintainer="Ben Sykes"
LABEL nodeVersion="15.3.0"

WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache 
RUN npm install && \
    npm install -g serve

COPY . .
RUN npm run build

EXPOSE 8080
ENTRYPOINT [ "serve", "-s", "-n", "build/", "-l", "8080" ]