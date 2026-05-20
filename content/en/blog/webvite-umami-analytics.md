---
title: "Umami in WebVite: Simple Analytics for Each Customer Website"
description: "Why WebVite uses Umami to provide clean, self-hosted and maintainable analytics on customer websites."
date: 2026-05-20
minRead: 3
image: https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
author:
  name: "YL"
  avatar:
    src: "/profile.png"
    alt: "YL"
---

WebVite generates and hosts websites for small businesses. In that context, analytics are not a side feature: they answer a question customers ask soon after launch.

Is my website being seen? Which pages work? Where do visitors come from?

Umami was chosen to answer that need without turning a simple product feature into a marketing stack.

## Why Umami

WebVite's need is specific: give each company a clear view of its website traffic without forcing Google Analytics, advertising cookies or tools that are hard to explain.

Umami fits this use case because it is lightweight, self-hostable and focused on useful metrics: visits, page views, traffic sources, devices and countries. For a small business website, that is usually enough to make good decisions without overwhelming the customer with reports.

The operational point matters too. WebVite controls the Umami instance, declared websites, linked domains and analytics sharing settings. The data stays in a known part of the platform instead of being spread across third-party accounts managed customer by customer.

## Technical Overview

In WebVite, the Laravel database remains the source of truth. Each company stores three Umami-related fields:

- the Umami website id
- the public share id
- whether analytics are public or private

When a company is created, a queued job creates the corresponding website in Umami and stores its id. When the custom domain changes, another job updates the domain in Umami. When the company is deleted, the linked Umami website can be deleted as well.

The tracking script is injected into the Blade layout only when the company has an Umami website id:

```html
<script
  defer
  src="https://umami.example.com/script.js"
  data-website-id="..."
></script>
```

This keeps customer websites simple. There is no per-site manual setup, no script for the customer to copy and no complex frontend condition.

On the server side, a Laravel service talks to Umami's internal API. It authenticates with admin credentials, caches the token, then creates, updates or deletes websites as product events happen.

A `umami:sync` command acts as a safety net. It regularly reconciles the WebVite database with the real Umami state: missing website, different domain, inconsistent share setting or orphaned website. Observers provide fast synchronization; the scheduled command repairs drift.

In the customer dashboard, a company can make its analytics available through an Umami share link. WebVite generates a `shareId`, pushes it to Umami, then displays a button to the shared dashboard.

## Tradeoffs and Gains

The main tradeoff is accepting one more dependency. Umami becomes a service to deploy, back up and monitor. WebVite also has to deal with eventual consistency: jobs and reconciliation are needed to absorb network failures or domain changes.

Umami is also less complete than a heavy analytics suite. That is intentional. WebVite is not trying to solve advanced advertising attribution; it is giving small businesses understandable indicators.

In return, the gains are clear:

- traffic measurement without advertising cookies
- automatic setup for every new customer website
- one shared instance to maintain
- shareable analytics when customers want them
- a simple architecture where Laravel remains the source of truth

For WebVite, Umami is a strong product compromise: powerful enough to be useful, restrained enough to stay maintainable.
