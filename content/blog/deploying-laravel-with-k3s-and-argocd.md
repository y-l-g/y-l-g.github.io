---
title: "Une architecture GitOps minimale pour Laravel sur k3s"
description: "Une architecture compacte pour exécuter plusieurs applications Laravel sur un petit VPS avec k3s, Argo CD, Redis, Postgres, sauvegardes, supervision et reprise rapide après incident."
date: 2026-05-11
minRead: 9
image: https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
author:
  name: "YL"
  avatar:
    src: "/profile.png"
    alt: "YL"
---

Voici une architecture GitOps minimale pour exécuter plusieurs applications Laravel sur un petit VPS.

L’objectif est pratique :

- un VPS peu coûteux
- cinq applications Laravel
- HTTPS
- Redis
- Postgres
- sauvegardes des fichiers et des bases de données
- supervision de disponibilité
- déploiements progressifs
- reprise après incident en moins de 30 minutes

Ce n’est pas de la haute disponibilité. C’est une configuration peu coûteuse et reproductible, où la stratégie de reprise est plus solide que le serveur lui-même.

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
      | réplicas web  |   | réplicas web  |   | réplicas web  |
      | worker queue  |   | worker queue  |   | worker queue  |
      | tâche cron    |   | tâche cron    |   | tâche cron    |
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
                                  sauvegardes compatibles S3
```

Le cluster reste assez petit pour être compris rapidement :

```text
system
  Argo CD
  cert-manager
  secrets scellés ou externes
  stockage
  contrôleur de sauvegarde

data
  Postgres
  Redis

monitoring
  contrôles de disponibilité

apps
  app-a
  app-b
  app-c
  app-d
  app-e
```

La règle est simple : l’infrastructure partagée va dans des namespaces partagés, les applications ont leurs propres namespaces, et tout ce qui compte peut être recréé depuis Git.

## Flux GitOps

```text
Développeur
   |
   | git push
   v
Pipeline CI
   |
   | construit l’image
   | pousse l’image
   v
Registre de conteneurs
   |
   | met à jour le tag ou le digest dans Git
   v
Dépôt GitOps
   |
   | Argo CD surveille Git
   v
Cluster k3s
   |
   | rolling update
   | readiness probes avant trafic
   v
Production
```

Le serveur ne devrait pas être configuré à la main après le bootstrap. Les changements manuels disparaissent. Les changements Git survivent.

## Stack d’outils

| Besoin                  | Outil                                |
| ----------------------- | ------------------------------------ |
| Kubernetes léger        | k3s                                  |
| Déploiement GitOps      | Argo CD                              |
| Ingress et routage      | Traefik                              |
| Certificats TLS         | cert-manager                         |
| Secrets dans Git        | Sealed Secrets ou External Secrets   |
| Base de données         | CloudNativePG                        |
| Cache et queues         | Redis                                |
| Fichiers Laravel        | Longhorn ou volumes persistants locaux |
| Restauration du cluster | Velero                               |
| Contrôles publics       | Uptime Kuma                          |

Les outils peuvent changer, mais évitez de supprimer les rôles. Même une petite plateforme a besoin de routage, secrets, stockage, sauvegardes et contrôles de santé.

## L’unité Laravel

Chaque application Laravel devrait ressembler au même petit bloc :

```text
namespace applicatif
  Ingress
    -> Service
      -> web Deployment, 2 réplicas

  queue Deployment, 1+ réplicas
  scheduler CronJob
  app Secret
  storage PVC
  déclaration de base de données
```

Pour cinq applications, répétez cette forme cinq fois.

```text
apps
  app-a  -> web + queue + scheduler + fichiers + db
  app-b  -> web + queue + scheduler + fichiers + db
  app-c  -> web + queue + scheduler + fichiers + db
  app-d  -> web + queue + scheduler + fichiers + db
  app-e  -> web + queue + scheduler + fichiers + db
```

Le processus web n’est qu’une partie de Laravel. Les queues et les commandes planifiées doivent être traitées comme des workloads à part entière.

## Déploiement web

Exécutez le processus web avec deux réplicas quand vous voulez des déploiements sans interruption.

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

Le trafic ne doit atteindre que les pods prêts.

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

Utilisez `/up` pour dire que le processus est vivant. Utilisez `/ready` pour dire que le pod peut recevoir du trafic.

L’application reçoit son environnement depuis un secret Kubernetes :

```yaml
envFrom:
  - secretRef:
      name: app-env
```

Le répertoire Laravel mutable devrait être un volume monté :

```text
/var/www/html/storage/app
```

Tout le reste devrait être dans l’image.

## Queues et scheduler

Les queues ne devraient pas tourner dans le pod web.

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

Si une queue est critique, Redis doit être durable ou la queue doit utiliser un backend durable.

Le scheduler est un CronJob Kubernetes :

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

Cela remplace un démon cron permanent dans le conteneur.

## Base de données et Redis

Utilisez un cluster Postgres managé dans Kubernetes et créez une base par application.

```text
Cluster Postgres
  base app_a
  base app_b
  base app_c
  base app_d
  base app_e
```

CloudNativePG fournit un contrôleur Postgres natif Kubernetes, des bases déclaratives, des sauvegardes et des workflows de restauration.

Une déclaration de base peut rester minuscule :

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

Redis peut être partagé par les applications :

```text
Redis
  cache
  sessions
  queues
  horizon
```

Sur les configurations peu coûteuses, Redis est souvent le service le moins protégé. Soyez explicite :

| Usage Redis          | Persistance nécessaire ?                          |
| -------------------- | ------------------------------------------------- |
| cache                | non                                               |
| sessions jetables    | peut-être                                         |
| queues               | oui, sauf si perdre des jobs est acceptable       |
| métriques Horizon    | non                                               |

## Déploiements sans interruption

Le chemin de déploiement devrait ressembler à ceci :

```text
ancien pod prêt
ancien pod prêt
       |
       | nouvelle image
       v
ancien pod prêt
ancien pod prêt
nouveau pod en démarrage
       |
       | readiness OK
       v
ancien pod prêt
nouveau pod prêt
nouveau pod prêt
       |
       | arrêt des anciens pods
       v
nouveau pod prêt
nouveau pod prêt
```

Les prérequis minimum :

- deux réplicas web
- `maxUnavailable: 0`
- une vraie readiness probe
- assez de mémoire pour les anciens et nouveaux pods pendant le rollout
- aucune tâche destructive au démarrage
- migrations exécutées séparément
- migrations de base de données rétrocompatibles

La règle de migration est celle que beaucoup oublient :

```text
déploiement 1 : ajouter une colonne nullable ou une nouvelle table
déploiement 2 : livrer le code qui l’utilise
déploiement 3 : supprimer l’ancienne colonne seulement après disparition de l’ancien code
```

Ne faites pas dépendre le nouveau pod d’un schéma qui casse l’ancien pod encore en train de recevoir du trafic.

## Sauvegardes

Les sauvegardes doivent couvrir quatre choses différentes.

```text
+-------------------+-----------------------------+------------------------+
| État              | Sauvegarde                  | Cible de restauration  |
+-------------------+-----------------------------+------------------------+
| Données Postgres  | sauvegarde DB + WAL         | cluster Postgres       |
| Fichiers Laravel  | sauvegarde de volume        | PVC applicatif         |
| État Kubernetes   | Velero                      | ressources du cluster  |
| Secrets           | scellés dans Git + copie clé| secrets applicatifs    |
+-------------------+-----------------------------+------------------------+
```

Le stockage objet est la cible la plus courante :

```text
cluster k3s
  sauvegardes Postgres ----+
  sauvegardes volumes -----+----> bucket compatible S3
  sauvegardes Velero ------+
```

Base de départ pour une sauvegarde quotidienne :

```yaml
schedule: "10 2 * * *"
ttl: 168h
destination: s3://production-backups
```

Sept jours de rétention n’ont rien de magique. C’est seulement un point de départ. L’important est que les sauvegardes de bases, de fichiers et de métadonnées du cluster soient toutes couvertes.

## Reprise après incident en 30 minutes

La reprise rapide vient de la réduction des décisions pendant l’incident.

```text
00:00  créer un nouveau VPS
05:00  installer k3s
08:00  installer Argo CD
10:00  restaurer l’accès Git et la clé de déchiffrement des secrets
12:00  synchroniser les contrôleurs de plateforme
15:00  restaurer Postgres et les volumes depuis S3
22:00  synchroniser les applications Laravel
25:00  pointer le DNS ou l’IP flottante vers le nouveau serveur
30:00  contrôles de disponibilité au vert
```

Le schéma de reprise :

```text
Dépôt Git                    Sauvegardes S3
  manifests plateforme          postgres
  manifests apps                fichiers
  secrets scellés               ressources cluster
        |                              |
        +--------------+---------------+
                       |
                       v
                 nouveau serveur k3s
                       |
                       v
                 applications restaurées
```

Le cluster est jetable. Git et les sauvegardes ne le sont pas.

## Supervision minimale

Commencez par des contrôles sur lesquels vous réagirez vraiment.

```text
Uptime Kuma
  GET https://app-a.example.com/up
  GET https://app-b.example.com/up
  GET https://app-c.example.com/up
  GET https://app-d.example.com/up
  GET https://app-e.example.com/up

Argo CD
  apps synchronisées
  apps saines

Base de données
  cluster sain
  sauvegarde récente

Sauvegardes
  dernière sauvegarde Velero terminée
  cible de sauvegarde des volumes joignable

Nœud
  disque non plein
  mémoire non épuisée
```

Prometheus et Grafana sont utiles plus tard. Pour une première version, des contrôles publics de disponibilité et la fraîcheur des sauvegardes détectent déjà les pannes les plus importantes.

## Checklist finale

Pour chaque application Laravel :

- un namespace
- un déploiement web avec deux réplicas
- un service
- un ingress avec TLS
- un déploiement queue si des jobs sont utilisés
- un CronJob scheduler
- un secret d’environnement
- un PVC pour `storage/app` si les fichiers sont locaux
- une base de données
- des readiness et liveness probes
- l’application incluse dans les contrôles de disponibilité
- l’état applicatif inclus dans les sauvegardes

Pour la plateforme :

- Argo CD peut reconstruire le cluster depuis Git
- les secrets peuvent être déchiffrés après une reprise
- les sauvegardes Postgres se restaurent correctement
- les sauvegardes de fichiers se restaurent correctement
- Velero peut restaurer les ressources Kubernetes
- le basculement DNS ou IP est documenté

Voilà la vraie architecture. Kubernetes n’est que le runtime. Le système fonctionne parce que le déploiement, les sauvegardes et la reprise sont conçus ensemble.
