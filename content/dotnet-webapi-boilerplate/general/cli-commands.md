---
title: "CLI Commands"
description: "Here are some important CLI Commands that are to be used along with fullstackhero."
lead: "Here are some important CLI Commands that are to be used along with fullstackhero."
date: 2021-08-24T11:40:05+05:30
lastmod: 2021-10-28T10:07:45+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "cli-commands"
    name: "CLI Commands"
    parent: "general"
weight: 4
toc: true
---


## Docker

### Build

This command is to be executed from the root folder of the project.

```powershell
docker build -t iammukeshm/dotnet-webapi:0.0.3-rc -t iammukeshm/dotnet-webapi:latest  .
```
### Push to DockerHub

This command is to be executed from the root folder of the project.

```powershell
docker push iammukeshm/dotnet-webapi
```

## Migrations
This command is to be executed from the Bootstrapper Directory of the project.

```powershell
dotnet ef migrations add <CommitMessage> --project .././Migrators/Migrators.<Provider>/ --context ApplicationDbContext -o Migrations/Application
```
CommitMessage : Enter a commit message here.
Provider : Enter the available DB Provider name. MSSQL , MySQL , PostgreSQL

## NuGet

Generates a NuGet Package of the entire solution. NuGet Configuration is available in the *.nuspec file at the root of the project directory. This command is to be executed from the Root Directory of the project.

```powershell
nuget pack -NoDefaultExcludes
```
