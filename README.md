# File Uploader

A simple file sharing app

## About

Created this simple file uploader to solve a problem I was having with free to use uploaders available on the internet for sharing a file with my friends and family over the internet. I looked for other open-source solutions and they didn't particularly scratch the right itch for me. I hope if someone else is looking for a simple (barebones) file share application to self-host, they can relax knowing that this exists and can be used simply with docker-compose on their machines/home servers.

## Available Configurations

- PORT: The port. Generally you should not need to change this
- DEFAULT_DIR: Where to store uploaded files
- MAX_FILES: Maximum files that can be uploaded
- MAX_SIZE_MB: Maximum individual file size that can be uploaded (**Note**: If you make this greater than 2048MB, you must also modify the `client_max_body_size` in the nginx.conf in `nginx/nginx.conf`)
- CLEAN_ENABLED: Whether or not to clean the upload directory on an interval.
- CLEAN_DIR_INTERVAL: iff `CLEAN_ENABLED` is set to `true`, then you can specify a number of days between each file wipe.

## Usage

To use this app with docker-compose, simply update the FILES ENDPOINT in `client/src/config/index.js` to include your server domain name.

> For example: `http://localhost/api/files` would turn into `http://uploader.sykesdev.ca/api/files` if I was hosting on sykesdev.ca.

### Development Specific

Once you have updated that file, run the compose like so.

```bash

docker-compose -f docker-compose.dev.yml up -d

```

### Production Environment

Modify settings (on `server` service in `docker-compose.yml`) using environment variables (**see available options above**)

After your modifications, run the `docker-compose.yml` file inside of the project directory.

```bash

docker-compose up -d

```

## Author

[Ben Sykes (SystemFiles)](https://sykesdev.ca)