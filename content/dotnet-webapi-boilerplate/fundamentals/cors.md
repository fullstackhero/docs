---
title: "CORS"
description: "Understanding CORS in fullstackhero's Web API."
lead: "Understanding CORS in fullstackhero's Web API."
date: 2021-08-24T11:40:05+05:30
lastmod: 2021-10-28T10:07:45+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "cors"
    name: "CORS"
    parent: "fundamentals"
weight: 11
toc: true
---

CORS is an mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own.

FullStackHero Web API has support for providing to several clients, all of the configurations related this feature can be found under `src/Host/Configurations/cors.json`.

We present two scenarios that demonstrate how Cross-Origin requests by clients can be served:
```
{
  "CorsSettings": {
    "Angular": "http://localhost:4200",
    "Blazor": "https://localhost:5002;https://www.mydomain.my"
  }
}
```

Documentation Coming Soon!

