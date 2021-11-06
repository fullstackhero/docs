---
title: "Project Structure"
description: "Here is how the .NET WebApi Boilerplate is structured."
lead: "Here is how the .NET WebApi Boilerplate is structured."
date: 2021-08-24T11:40:05+05:30
lastmod: 2021-11-06T13:29:23+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "general-project-structure"
    name: "Project Structure"
    parent: "general"
weight: 5
toc: true
---

fullstackhero's .NET WebApi Boilerplate is based on Clean Architecture. In other words, Onion / Hexagonal Architecture. [Read about the advantages and principles of Onion Architecture here →]("https://codewithmukesh.com/blog/onion-architecture-in-aspnet-core/")

## General Structure

This means that the entire solution is built in such a way that it can be scaled, maintained easily by teams of developers. This WebAPI Solution Primarily consists of the following .csproj files.

```bash
├── src
│   ├── Bootstrapper.csproj
│   ├── Core
│   |   ├── Application.csproj
│   |   └── Domain.csproj
|   ├── Infrastructure.csproj
|   ├── Migrators
│   |   ├── Migrators.MSSQL.csproj
│   |   ├── Migrators.MySQL.csproj
│   |   └── Migrators.PostgreSQL.csproj
│   └── Shared
│       └── Shared.DTOs.csproj
```

The idea is to build a very loosely coupled architecture following best practices and packages. Let's see in brief what responsibilities each of these projects handle.

### Bootstrapper
Contains the API Controllers and Startup Logic including ASP.NET Core Container setup. This is the entry point of the application. Also, other static files like the logs, localization jsons, images, email templates and most importantly the appsettings.json live under this project.

```bash
├── Bootstrapper
|   ├── Controllers
|   ├── Email Templates
|   ├── Files
│   |   ├── Images
│   |   └── Documents
|   ├── Localization
|   ├── Settings
|   └── appsettings.json
```

Note that the *Bootstrapper* project depends on
- Application
- Infrastructure
- Migration Projects

### Application

This is one of the projects in the Core Folder apart from the Domain Project. Here you get to see Abstract Classes and Interfaces that are inherited and implemented in the Infrastructure Project. This refers to Dependency Inversion.

``` bash
├── Core
|   ├── Application
|   |   ├── Abstraction
|   |   ├── Constants
|   |   ├── Exceptions
|   |   ├── Extensions
|   |   ├── Services
|   |   ├── Settings
|   |   ├── Specifications
|   |   ├── Validators
|   |   └── Wrapper

```

1. Abstraction folder consists of the majorly used Interfaces throughout the project including **IRepositoryAsync**  and **ITenantService**

Note that the *Application* project does not depend on any other project.

### Domain

Note that the *Domain* project does not depend on any other project.


As per Clean Architecture principles, the Core of this Solution i.e, Application and Domain projects do not depend on any other projects. This helps achieve Dependency Inversion (The 'D' Principle of 'SOLID').

## Directory

This is the folder directory you will be seeing every-time a new project is generated via the FullStackHero .NET WebAPI Template.
```bash
├── src
│   ├── Bootstrapper
│   |   ├── Controllers
│   |   ├── Email Templates
│   |   ├── Files
│   |   ├── Localization
│   |   ├── Settings
│   |   └── appsettings.json
|   ├── Core
│   |   ├── Application
│   |   |   ├── Abstraction
│   |   |   ├── Constants
│   |   |   ├── Exceptions
│   |   |   ├── Extensions
│   |   |   ├── Services
│   |   |   ├── Settings
│   |   |   ├── Specifications
│   |   |   ├── Validators
│   |   |   └── Wrapper
│   |   └── Domain
│   |   |   ├── Constants
│   |   |   ├── Contracts
│   |   |   ├── Entities
│   |   |   ├── Enums
│   |   |   ├── Events
│   |   |   ├── Extensions
│   |   |   └── Interfaces
|   ├── Infrastructure
│   |   ├── Auditing
│   |   ├── Extensions
│   |   ├── HealthChecks
│   |   ├── Identity
│   |   ├── Localizer
│   |   ├── Mappings
│   |   ├── Middlewares
│   |   ├── Persistence
│   |   ├── Services
│   |   ├── SwaggerFilters
│   |   └── Utilities
|   ├── Migrators
│   |   ├── Migrators.MSSQL
│   |   ├── Migrators.MySQL
│   |   └── Migrators.PostgreSQL
│   └── Shared
│       └── Shared.DTOs
├── postman
├── deployments
├── tests
├── README.md
├── DN.WebAPI.sln
├── LICENSE
└── .gitignore
```
