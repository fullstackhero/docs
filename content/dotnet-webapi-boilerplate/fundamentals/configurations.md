---
title: "Configurations"
description: "Understanding Configurations in fullstackhero's Web API."
lead: "Understanding Configurations in fullstackhero's Web API."
date: 2021-08-24T11:40:05+05:30
lastmod: 2021-10-28T10:07:45+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "configurations"
    name: "Configurations"
    parent: "fundamentals"
weight: 8
toc: true
---

Within the Host boot project there is a folder called "Configurations". where there are all the configuration files, one for each area.

## General Structure
```bash
├── Host.csproj
│   ├── Configurations
│   |   ├── cache.json
│   |   ├── cors.json
│   |   ├── database.json
│   |   ├── hangfire.json
│   |   ├── logger.json
│   |   ├── mail.json
│   |   ├── middleware.json
│   |   ├── security.json
│   |   └── signalr.json
|   ├── appsettings.json
|
```

> The classic appsettings.json configuration file is still available to manage custom parameters.
