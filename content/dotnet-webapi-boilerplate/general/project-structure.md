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
