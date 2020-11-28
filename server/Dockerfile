FROM node:15.3.0-alpine3.10

LABEL maintainer="Ben Sykes"
LABEL nodeVersion="15.3.0"

WORKDIR /app
COPY package-lock.json .
COPY package.json .

# Install dependencies
RUN npm install

# Copy files and start server
COPY . .

EXPOSE 5000
ENTRYPOINT [ "node", "server.js" ]