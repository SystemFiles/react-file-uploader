<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=200px src="/.github/docs/media/logo.png" alt="Logo"></a>
</p>

<h3 align="center">Fullstack File Uploader</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/systemfiles/fullstack-file-share.svg)](https://github.com/systemfiles/fullstack-file-share/issues)
![Lint Node](https://github.com/SystemFiles/fullstack-file-share/workflows/Lint%20Node/badge.svg)
![CodeQL](https://github.com/SystemFiles/fullstack-file-share/workflows/CodeQL/badge.svg)
![Build and Push Docker](https://github.com/SystemFiles/fullstack-file-share/workflows/Build%20and%20Push%20Docker/badge.svg)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/systemfiles/fullstack-file-share.svg)](https://github.com/systemfiles/fullstack-file-share/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A simple barebones file sharing app to deploy with docker-compose, kubernetes, or simply docker run.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [CHANGELOG](/CHANGELOG.md)
- [Config Options](#config)
- [Usage](#usage)
- [Authors](#authors)

## ℹ️ About <a name = "about"></a>

<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=200px src="/.github/docs/media/logo.png" alt="Logo"></a>
</p>

Created this simple file uploader to solve a problem I was having with free to use uploaders available on the internet for sharing a file with my friends and family over the internet. I looked for other open-source solutions and they didn't particularly scratch the right itch for me. I hope if someone else is looking for a simple (barebones) file share application to self-host, they can relax knowing that this exists and can be used simply with docker-compose on their machines/home servers.

## 🔧 Available Configurations <a name = "config"></a>

- `PORT`: The port. Generally you should not need to change this
- `DEFAULT_DIR`: Where to store uploaded files
- `MAX_FILES`: Maximum files that can be uploaded
- `MAX_SIZE_MB`: Maximum individual file size that can be uploaded (**Note**: If you make this greater than 2048MB, you must also modify the `client_max_body_size` in the nginx.conf in `nginx/nginx.conf`)
- `CLEAN_ENABLED`: Whether or not to clean the upload directory on an interval.
- `CLEAN_DIR_INTERVAL`: iff `CLEAN_ENABLED` is set to `true`, then you can specify a number of days between each file wipe.

## 🚀 Usage <a name = "usage"></a>

To use this app with docker-compose, simply update the `FILES_ENDPOINT` variable in `client/src/config/index.js` to include your server domain name.

> For example: `http://localhost/api/files` would turn into `http://uploader.sykesdev.ca/api/files` if I was hosting on sykesdev.ca.

### Development Specific (Compose)

Once you have updated that file, run the compose like so.

```bash

docker-compose -f docker-compose.dev.yml up -d

```

### Production Environment (Compose) (Recommended)

Modify settings (on `server` service in `docker-compose.yml`) using environment variables (**see available options above**)

After your modifications, run the `docker-compose.yml` file inside of the project directory.

```bash

docker-compose up -d

```

### Run with Docker

If you want to run with docker, you will need to start pull both the client and server images and run them on the same network.

First create a network to use

```bash

docker network create <network_name>

```

Run the client container

```bash

docker run -d \
  --name=uploader-client \
  --restart=unless-stopped \
  -p 8080:8080 \
  --rm \
  --network <network_name> sykeben/file-uploader-client:1.x

```

> Note: Client port cannot be changed from 8080, but you can specify a different port mapping if you wish.

Run the server

```bash

docker run -d \
  --name=uploader-api \
  --restart=unless-stopped \
  -p 5000:5000 \
  --rm \
  --network <network_name> \
  -e DEFAULT_DIR=/files \
  -e MAX_SIZE_MB=256 \
  -e CLEAN_ENABLED=true \ 
  -v <path/to/files>:/files \
  sykeben/file-uploader-api:1.x

```

> Note: Specify a volume mount that has rw on your host machine

That's it. If you experience any issues, please feel free to open an issue on GitHub and I will try my best to fix it.

## ✍️ Author <a name = "authors"></a>

[Ben Sykes (SystemFiles)](https://sykesdev.ca)