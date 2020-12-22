FROM node:14.15.3-alpine3.12

LABEL maintainer="Ben Sykes (SystemFiles)"

# Setup environment
RUN apk add --no-cache tini bind-tools
RUN addgroup -g 10001 -S backenduser && adduser -u 10000 -S -G backenduser -h /home/backenduser backenduser


# Install project dependencies
WORKDIR /app
COPY package.json .
RUN npm install

# Copy project files and setup server
COPY . .

# Fix folder permissions for file storage
RUN mkdir -p /files && \
    chown -R backenduser:backenduser /files

EXPOSE 5000
ENTRYPOINT ["/sbin/tini", "--", "node"]
USER backenduser
CMD ["server.js"]