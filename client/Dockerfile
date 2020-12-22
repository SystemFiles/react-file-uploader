FROM node:15.3.0-alpine3.10

LABEL maintainer="Ben Sykes (SystemFiles)"

# Setup environment
RUN npm install -g serve
RUN addgroup -g 10001 -S uploadUser && adduser -u 10000 -S -G uploadUser -h /home/uploadUser uploadUser
RUN apk add --no-cache tini bind-tools

# Install dependencies
WORKDIR /app
COPY package.json .
RUN npm install

# Build production client
COPY . .
RUN npm run build

EXPOSE 8080
ENTRYPOINT ["/sbin/tini", "--", "serve"]

USER uploadUser
CMD ["-s", "-n", "build/", "-l", "8080"]