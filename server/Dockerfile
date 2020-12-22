FROM node:15.3.0-alpine3.10

LABEL maintainer="Ben Sykes (SystemFiles)"

# Setup environment
RUN apk add --no-cache tini bind-tools
RUN addgroup -g 10001 -S nonroot && adduser -u 10000 -S -G nonroot -h /home/nonroot nonroot


# Install project dependencies
WORKDIR /app
COPY package.json .
RUN npm install

# Copy project files and setup server
COPY . .

EXPOSE 5000
ENTRYPOINT ["/sbin/tini", "--", "node"]
USER nonroot
CMD ["server.js"]