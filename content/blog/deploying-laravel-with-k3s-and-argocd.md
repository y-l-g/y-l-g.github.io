---
title: "A Minimal GitOps Architecture for Laravel on k3s"
description: "A compact architecture for running several Laravel applications on one small VPS with k3s, Argo CD, Redis, Postgres, backups, uptime checks, and fast disaster recovery."
date: 2026-05-11
minRead: 9
image: https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
author:
  name: "YL"
  avatar:
    src: "/profile.png"
    alt: "YL"
---

This is a minimal GitOps architecture for running several Laravel applications on a small VPS.

The target is practical:

- one cheap vps
- five Laravel apps
- HTTPS
- Redis
- Postgres
- file and database backups
- uptime monitoring
- rolling deployments
- disaster recovery in less than 30 minutes

This is not high availability. It is a low-cost, reproducible setup where the recovery story is stronger than the server.

## Architecture

```text
                              Internet
                                  |
                                  v
                         +----------------+
                         | Traefik + TLS  |
                         +----------------+
                                  |
              +-------------------+-------------------+
              |                   |                   |
              v                   v                   v
          Laravel A           Laravel B           Laravel C...
              |                   |                   |
      +-------+-------+   +-------+-------+   +-------+-------+
      | web replicas  |   | web replicas  |   | web replicas  |
      | queue worker  |   | queue worker  |   | queue worker  |
      | scheduler job |   | scheduler job |   | scheduler job |
      +-------+-------+   +-------+-------+   +-------+-------+
              |                   |                   |
              +----------+--------+--------+----------+
                         |                 |
                         v                 v
                    +---------+       +----------+
                    |  Redis  |       | Postgres |
                    +---------+       +----------+
                                           |
                                           v
                                    S3-compatible backups
```

The cluster is small enough to reason about:

```text
system
  Argo CD
  cert-manager
  sealed or external secrets
  storage
  backup controller

data
  Postgres
  Redis

monitoring
  uptime checks

apps
  app-a
  app-b
  app-c
  app-d
  app-e
```

The rule is simple: shared infrastructure goes in shared namespaces, applications get their own namespaces, and everything important is recreated from Git.

## GitOps Flow

```text
Developer
   |
   | git push
   v
CI pipeline
   |
   | build image
   | push image
   v
Container registry
   |
   | update image tag or digest in Git
   v
GitOps repository
   |
   | Argo CD watches Git
   v
k3s cluster
   |
   | rolling update
   | readiness probes gate traffic
   v
Production
```

The server should not be configured by hand after bootstrap. Hand changes disappear. Git changes survive.

## Tool Stack

| Need                   | Tool                                 |
| ---------------------- | ------------------------------------ |
| Lightweight Kubernetes | k3s                                  |
| GitOps deployment      | Argo CD                              |
| Ingress and routing    | Traefik                              |
| TLS certificates       | cert-manager                         |
| Secrets in Git         | Sealed Secrets or External Secrets   |
| Database               | CloudNativePG                        |
| Cache and queues       | Redis                                |
| Laravel files          | Longhorn or local persistent volumes |
| Cluster restore        | Velero                               |
| Public checks          | Uptime Kuma                          |

You can swap tools, but avoid removing the roles. A small platform still needs routing, secrets, storage, backups, and health checks.

## The Laravel Unit

Each Laravel app should look like the same small unit:

```text
app namespace
  Ingress
    -> Service
      -> web Deployment, 2 replicas

  queue Deployment, 1+ replicas
  scheduler CronJob
  app Secret
  storage PVC
  database declaration
```

For five apps, repeat the same shape five times.

```text
apps
  app-a  -> web + queue + scheduler + files + db
  app-b  -> web + queue + scheduler + files + db
  app-c  -> web + queue + scheduler + files + db
  app-d  -> web + queue + scheduler + files + db
  app-e  -> web + queue + scheduler + files + db
```

The web process is only one part of Laravel. Treat queues and scheduled commands as first-class workloads.

## Web Deployment

Run the web process with two replicas when you want zero-downtime deploys.

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
```

Traffic should only reach ready pods.

```yaml
livenessProbe:
  httpGet:
    path: /up
    port: 8080

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
```

Use `/up` for "the process is alive". Use `/ready` for "this pod can receive traffic".

The app receives its environment from a Kubernetes secret:

```yaml
envFrom:
  - secretRef:
      name: app-env
```

The mutable Laravel directory should be a mounted volume:

```text
/var/www/html/storage/app
```

Everything else should be inside the image.

## Queue and Scheduler

Queues should not run inside the web pod.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: queue
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: queue
          command: ["php", "artisan", "horizon"]
```

If a queue is critical, Redis must be durable or the queue should use a durable backend.

The scheduler is a Kubernetes CronJob:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: scheduler
spec:
  schedule: "* * * * *"
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: scheduler
              command: ["php", "artisan", "schedule:run"]
```

That replaces a permanent cron daemon inside the container.

## Database and Redis

Use one managed Postgres cluster inside Kubernetes and create one database per app.

```text
Postgres cluster
  app_a database
  app_b database
  app_c database
  app_d database
  app_e database
```

CloudNativePG gives you a Kubernetes-native Postgres controller, declarative databases, backups, and recovery workflows.

A database declaration can stay tiny:

```yaml
apiVersion: postgresql.cnpg.io/v1
kind: Database
metadata:
  name: app-a
spec:
  cluster:
    name: postgres
  name: app_a
  owner: app
```

Redis can be shared by the apps:

```text
Redis
  cache
  sessions
  queues
  horizon
```

For cheap setups, Redis is often the least protected service. Be explicit:

| Redis use           | Persistence required?                 |
| ------------------- | ------------------------------------- |
| cache               | no                                    |
| disposable sessions | maybe                                 |
| queues              | yes, unless losing jobs is acceptable |
| Horizon metrics     | no                                    |

## Zero-Downtime Deployments

The deployment path should look like this:

```text
old pod ready
old pod ready
       |
       | new image arrives
       v
old pod ready
old pod ready
new pod starting
       |
       | readiness passes
       v
old pod ready
new pod ready
new pod ready
       |
       | old pods terminate
       v
new pod ready
new pod ready
```

The minimum requirements:

- two web replicas
- `maxUnavailable: 0`
- a real readiness probe
- enough memory for old and new pods during rollout
- no destructive startup tasks
- migrations run separately
- database migrations are backward-compatible

The migration rule is the one people skip:

```text
deploy 1: add nullable column or new table
deploy 2: write code that uses it
deploy 3: remove old column only after old code is gone
```

Do not make the new pod require a schema that breaks the old pod still receiving traffic.

## Backups

Backups need to cover four different things.

```text
+-------------------+--------------------------+-------------------+
| State             | Backup                   | Restore target    |
+-------------------+--------------------------+-------------------+
| Postgres data     | database backup + WAL    | Postgres cluster  |
| Laravel files     | volume backup            | app PVC           |
| Kubernetes state  | Velero                   | cluster resources |
| Secrets           | sealed in Git + key copy | app secrets       |
+-------------------+--------------------------+-------------------+
```

Object storage is the common target:

```text
k3s cluster
  Postgres backups ----+
  volume backups ------+----> S3-compatible bucket
  Velero backups ------+
```

The daily backup baseline:

```yaml
schedule: "10 2 * * *"
ttl: 168h
destination: s3://production-backups
```

Seven days of retention is not magic. It is just a starting point. The important part is that database backups, file backups, and cluster metadata are all covered.

## Disaster Recovery in 30 Minutes

Fast recovery comes from reducing decisions during the incident.

```text
00:00  create a new VPS
05:00  install k3s
08:00  install Argo CD
10:00  restore Git access and secret decryption key
12:00  sync platform controllers
15:00  restore Postgres and volumes from S3
22:00  sync Laravel apps
25:00  point DNS or floating IP to the new server
30:00  uptime checks green
```

The recovery diagram:

```text
Git repository                 S3 backups
  platform manifests             postgres
  app manifests                  files
  sealed secrets                 cluster resources
        |                              |
        +--------------+---------------+
                       |
                       v
                  new k3s server
                       |
                       v
                  apps restored
```

The cluster is disposable. Git and backups are not.

## Minimal Monitoring

Start with checks you will actually react to.

```text
Uptime Kuma
  GET https://app-a.example.com/up
  GET https://app-b.example.com/up
  GET https://app-c.example.com/up
  GET https://app-d.example.com/up
  GET https://app-e.example.com/up

Argo CD
  apps are Synced
  apps are Healthy

Database
  cluster healthy
  latest backup recent

Backups
  latest Velero backup completed
  volume backup target reachable

Node
  disk not full
  memory not exhausted
```

Prometheus and Grafana are useful later. For the first version, public uptime checks plus backup freshness already catch the failures that matter most.

## Final Checklist

For each Laravel app:

- one namespace
- one web deployment with two replicas
- one service
- one ingress with TLS
- one queue deployment if jobs are used
- one scheduler CronJob
- one environment secret
- one PVC for `storage/app` if files are local
- one database
- readiness and liveness probes
- app included in uptime checks
- app state included in backups

For the platform:

- Argo CD can rebuild the cluster from Git
- secrets can be decrypted after disaster recovery
- Postgres backups restore successfully
- file backups restore successfully
- Velero can restore Kubernetes resources
- DNS or IP failover is documented

That is the real architecture. Kubernetes is only the runtime. The system works because deployment, backups, and recovery are designed together.
