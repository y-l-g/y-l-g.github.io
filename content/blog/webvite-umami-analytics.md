---
title: "Umami dans WebVite : des statistiques simples pour chaque site client"
description: "Pourquoi WebVite utilise Umami pour offrir des statistiques propres, auto-hébergées et faciles à maintenir sur les sites de ses clients."
date: 2026-05-20
minRead: 3
image: https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
author:
  name: "YL"
  avatar:
    src: "/profile.png"
    alt: "YL"
---

WebVite génère et héberge des sites pour des petites entreprises. Dans ce contexte, les statistiques ne sont pas un produit annexe : elles répondent à une question simple que les clients posent vite après la mise en ligne.

Est-ce que mon site est vu ? Quelles pages fonctionnent ? D'où viennent les visiteurs ?

Umami a été choisi pour répondre à ce besoin sans transformer une fonctionnalité simple en usine marketing.

## Pourquoi Umami

Le besoin de WebVite est assez cadré : donner à chaque entreprise une vue claire de l'audience de son site, sans imposer Google Analytics, sans cookies publicitaires et sans empiler des outils difficiles à expliquer.

Umami convient bien à ce cas d'usage parce qu'il est léger, auto-hébergeable et centré sur les métriques utiles : visites, pages vues, sources de trafic, appareils et pays. Pour un site vitrine de petite entreprise, c'est généralement ce qu'il faut pour prendre de bonnes décisions sans noyer le client dans des rapports.

Le point important est aussi opérationnel. WebVite contrôle l'instance Umami, les sites déclarés, les domaines associés et le niveau de partage des statistiques. Les données restent dans une brique connue de la plateforme, au lieu d'être dispersées dans des comptes tiers gérés client par client.

## Vue technique

Dans WebVite, la base Laravel reste la source de vérité. Chaque entreprise porte trois informations liées à Umami :

- l'identifiant du site Umami
- l'identifiant de partage public
- le choix de rendre les statistiques publiques ou privées

Lorsqu'une entreprise est créée, un job crée le site correspondant dans Umami et stocke son identifiant. Si le domaine personnalisé change, un autre job met à jour le domaine dans Umami. Si l'entreprise est supprimée, le site Umami associé peut être supprimé aussi.

Le script de suivi est injecté dans le layout Blade uniquement quand l'entreprise possède un identifiant Umami :

```html
<script
  defer
  src="https://umami.example.com/script.js"
  data-website-id="..."
></script>
```

Ce choix garde les sites clients simples. Il n'y a pas de configuration manuelle par site, pas de script à copier-coller par le client et pas de condition complexe côté front.

Côté serveur, un service Laravel parle à l'API interne d'Umami. Il se connecte avec des identifiants d'administration, met le token en cache, puis crée, met à jour ou supprime les sites selon les événements produit.

Une commande `umami:sync` sert de filet de sécurité. Elle réconcilie régulièrement la base WebVite avec l'état réel d'Umami : site manquant, domaine différent, partage incohérent ou site orphelin. Les observers donnent une synchronisation rapide ; la commande planifiée corrige les écarts.

Dans l'espace client, l'entreprise peut choisir de rendre ses statistiques accessibles via un lien de partage Umami. WebVite génère alors un `shareId`, le pousse vers Umami, puis affiche un bouton vers le tableau de bord partagé.

## Arbitrages et gains

Le principal arbitrage est d'accepter une dépendance supplémentaire. Umami devient un service à déployer, sauvegarder et surveiller. Il faut aussi composer avec une cohérence éventuelle : les jobs et la commande de réconciliation sont nécessaires pour absorber les échecs réseau ou les changements de domaine.

Umami est également moins complet qu'une suite analytique lourde. C'est volontaire. WebVite ne cherche pas à faire de l'attribution publicitaire avancée, mais à fournir des indicateurs compréhensibles aux petites entreprises.

En échange, les gains sont nets :

- une mesure d'audience sans cookies publicitaires
- une intégration automatique pour chaque nouveau site client
- une seule instance à maintenir
- des statistiques partageables quand le client le souhaite
- une architecture simple où Laravel reste la source de vérité

Pour WebVite, Umami est donc un bon compromis produit : assez puissant pour être utile, assez sobre pour rester maintenable.
