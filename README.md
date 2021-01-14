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
 <img width=360px height=300px src="/.github/docs/media/demo.gif" alt="Logo"></a>
</p>

Created this simple file uploader to solve a problem I was having with free to use uploaders available on the internet for sharing a file with my friends and family over the internet. I looked for other open-source solutions and they didn't particularly scratch the right itch for me. I hope if someone else is looking for a simple (barebones) file share application to self-host, they can relax knowing that this exists and can be used simply with docker-compose on their machines/home servers.

## 🔧 Available Configurations <a name = "config"></a>

| Option               	| Description                                                                                                                                                              	| Default        	| Required 	|
|----------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|----------------	|----------	|
| `API_PORT`           	| Defines the port for the backend service to listen on.                                                                                                                   	| `5000`         	| Y        	|
| `DEFAULT_DIR`        	| Default location to store client uploaded files on the system                                                                                                            	| `/media/files` 	| Y        	|
| `MAX_FILES`          	| Maximum number of files that can be uploaded in a single request                                                                                                         	| `6`            	| N        	|
| `MAX_SIZE_MB`        	| Maximum file size for any file being uploaded to the storage solution (note: future editions of this software will include cloud blob storage as an option)              	| `2048` (in MB) 	| N        	|
| `CLEAN_ENABLED`      	| Whether or not to empty the upload directory on an interval. (use this if you plan on only storing files temporarily for short periods **or** if you have limited space) 	| `false`        	| N        	|
| `CLEAN_DIR_INTERVAL` 	| iff `CLEAN_ENABLED` is `enabled`, then you can specify a number of days between each directory cleaning.                                                                 	| `7`            	| N        	|

## 🚀 Usage <a name = "usage"></a>

To use this app with docker-compose, simply update the `FILES_ENDPOINT` variable in `client/src/config/index.js` to include your server domain name.

> For example: `http://localhost/api/files` would turn into `http://uploader.sykesdev.ca/api/files` if I was hosting on `uploader.sykesdev.ca`.

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