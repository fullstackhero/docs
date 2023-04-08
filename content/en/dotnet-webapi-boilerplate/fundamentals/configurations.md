---
title: "Configurations"
description: "Understanding Configurations in fullstackhero's Web API."
lead: "Understanding Configurations in fullstackhero's Web API."
date: 2021-08-24T11:40:05+05:30
lastmod: 2021-10-28T10:07:45+05:30
draft: false
images: []
menu:
  dotnet-webapi-boilerplate:
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
│   |   ├── openapi.json
│   |   ├── security.json
│   |   ├── securityheaders.json
│   |   └── signalr.json
|   ├── appsettings.json
|
```

> The classic appsettings.json configuration file is still available to manage custom parameters.

The **`Startup` class** inside the folder is responsible for loading all the configuration files described above.

## Cache

By default, the application uses in-memory cache. To enable Distributed caching with Redis, set the `UseDistributedCache` and `PreferRedis` to true and give a valid redis url!

```json
{
  "CacheSettings": {
    "UseDistributedCache": false,
    "PreferRedis": false,
    "RedisURL": "localhost:6379"
  }
}
```
## CORS

Depends on the client consuming the WebAPI.

```json
{
  "CorsSettings": {
    "Angular": "http://localhost:4200",
    "Blazor": "https://localhost:5002;https://www.mydomain.my",
    "React": "http://localhost:3000"
  }
}
```
## Database

```json
{
  "DatabaseSettings": {
    "DBProvider": "postgresql",
    "ConnectionString": "Host=localhost;Port=5432;Database=fshDb;Username=postgres;Password=admin;Include Error Detail=true"
  }
}
```
