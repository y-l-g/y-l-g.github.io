---
title: "Deploying a Laravel Application with Docker and Portainer: The Complete Guide"
description: "In this guide, we'll walk through how to deploy a Laravel application from A to Z using a VPS, Docker, and the Portainer graphical interface. The goal is to create a simple, reproducible, and efficient deployment workflow."

date: 2025-11-07
image: https://images.pexels.com/photos/1050312/pexels-photo-1050312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
---
## Prerequisites

Before we begin, here's what you'll need:

- A VPS
- A domain name

## 1. Preparing the VPS Server

Choose a system image with **Docker pre-installed**. This will save you time!

### Initialize Docker Swarm

**Why Docker Swarm on a single node?**
Even on a single server, Swarm mode enables powerful orchestration features like **Stacks**, **Secrets**, and **Configs**.

```bash
sudo docker swarm init
```

## 2. Installing Portainer Business Edition

Portainer simplifies Docker management through an intuitive web interface. We will use the **Business Edition** (BE).

The Portainer Business Edition is **free for up to 3 nodes**.

### Get a Free License

Go to the [Portainer website](https://www.portainer.io/products/business-edition) to request a free license.

### Deploy Portainer

Portainer installs itself as a Docker container.

```bash
curl -L https://downloads.portainer.io/ee-lts/portainer-agent-stack.yml -o portainer-agent-stack.yml
docker stack deploy -c portainer-agent-stack.yml portainer
```

Once the container is running, access Portainer at `https://<your-vps-ip>:9443`. Create your administrator account, paste your license key, and connect to the local Docker environment.

## 3. Deploying Base Services

Before deploying our application, we need a database.

### Deploy a MySQL Database

- In Portainer, go to `Services > Add` service and create a `database` service using the image you want for exemple mysql
- Create a secret `MYSQL_ROOT_PASSWORD` and use the environment variable `MYSQL_ROOT_PASSWORD_FILE` with the value `/run/secrets/MYSQL_ROOT_PASSWORD`

### Deploy phpMyAdmin

- Create an overlay network `database_network` and connect the mysql service `database` to it
- Add a service `phpmyadmin`
- Put the envs `MYSQL_ROOT_PASSWORD_FILE` to `/run/secrets/MYSQL_ROOT_PASSWORD` and PMA_HOST to `database` (or the name of the mysql service). Connect phpMyAdmin to the `database_network`
- Publish the port 8081
- You can now access phpMyAdmin at `http://<your-vps-ip>:8081`. Log in with the user `root` and your password, then create a new user (optional) and an empty database `laravel_app`

::warning
Exposing phpMyAdmin publicly is a security risk. For a real production application, it is highly recommended not to expose this port or to restrict access to certain IP addresses via a firewall or at least add 2FA.
::

## 4. Preparing the Laravel Application

Our Laravel application must be containerized and ready for deployment. Make sure you have the following files in your Git repository.

**Your Project Structure**
- `.github/workflows/docker-publish.yml`: The GitHub Action that builds and publishes the Docker image.
- `Dockerfile`: The "recipe" for building your application's image with FrankenPHP.
- `compose.yml`: The file that describes how to deploy your application as a Portainer stack.
- `start-container.sh`: A script that runs at container startup to finalize Laravel's configuration.

```dockerfile[Dockerfile]
FROM dunglas/frankenphp
WORKDIR /app
RUN install-php-extensions \
    @composer \
    pdo_mysql \
COPY --link --chmod=755 start-container.sh /usr/local/bin/start-container
COPY --link . ./
RUN composer install -v \
    --no-dev \
    --no-interaction \
```
```bash[start-container.sh]
#!/bin/sh
set -e
cp /run/secrets/app_env .env
php /app/artisan optimize
php /app/artisan storage:link
exec "$@"
```
```yml[compose.yml]
services:
  app:
    image: ghcr.io/<YOUR_GITHUB_USERNAME>/<YOUR_APP_NAME>:main
    secrets:
      - laravel-app_env
    healthcheck:
      test: sh -c 'php artisan octane:status'
      start_period: 20s
    command: sh -c 'php artisan octane:frankenphp --host=0.0.0.0'
secrets:
  laravel-app_env:
    external: true
networks:
  laravel-app:
    external: true
```

```yml[docker-publish.yml]
name: Create and publish a Docker image
on:
  push:
    branches:
      - main
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      attestations: write
      id-token: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
      - name: Build and push Docker image
        id: push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```

## 5. Deploying Laravel via Portainer

### Create the Secret in Portainer

The secret is the secure way to provide your environment variables to the application.
1.  In Portainer, go to **Secrets** > **Add secret**.
2.  Name the secret `laravel-app_env`.
3.  Paste the contents of your production `.env` file, `APP_KEY` included. Make sure the database variables are correct:

```env[laravel-app_env]
DB_CONNECTION=mysql
DB_HOST=database # The service name of the database
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root # or the user you created
DB_PASSWORD=<YOUR_STRONG_ROOT_PASSWORD>
```

### Deploy the Stack

1. Create a new network `laravel-app`
2. Go to **Stacks** > **Add stack**.
3. Name the stack `laravel-app`.
4. Choose **Repository** as the deployment method, fill in your repository URL and the path to `compose.yml`.
5. Click **Deploy the stack**.
Once the deployment is complete, your Laravel application should be accessible at: `http://<your-vps-ip>:8000`.

## 6. Going Further: Reverse Proxy with Caddy

Let's use Caddy to expose our application on a domain name with HTTPS automatically enabled.

Create a new `caddy` service and publish the ports `80:80` and `443:443`. Attach it to the `laravel-app` network

Create a config Caddyfile

```Caddyfile[Caddyfile]
yourdomain.com {
  reverse_proxy laravel-app_app:8000
}
```
::tip
The name `laravel-app_app` corresponds to `{stack_name}_{service_name}`.
::
Attach it to the caddy service and set the path in the container to `/etc/caddy/Caddyfile`

After deploying Caddy, don't forget to **remove the port `8000` publication** from your Laravel stack so that all traffic goes through Caddy.

## Conclusion

Congratulations! Your app is up and running, and the only ting you have installed on your vps is Docker.

