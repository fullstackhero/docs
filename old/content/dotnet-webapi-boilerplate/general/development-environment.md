---
title: "Development Environment"
description: "Setting up the Development Environment for the .NET WebApi Boilerplate"
lead: "Let's get started with setting up the Development Environment for .NET WebApi Boilerplate Development!"
date: 2021-08-30T00:59:34+05:30
lastmod: 2021-10-15T08:54:03+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "general-development-environment"
    name: "Development Environment"
    parent: "general"
weight: 2
toc: true
---
fullstackhero's **.NET WebApi Boilerplate** Project Development needs you to have the following applications / tools available on your machine. Please Note that this project is being built on a Windows 10 Machine using Visual Studio Code IDE.

## .NET SDK

As mentioned earlier, this project is built with the latest available .NET SDK, which is .NET 6.0. Since the SDK is currently at preview, the project will be released by Mid-November as soon as Microsoft launches .NET 6.0 LTS SDK. But that doesn't stop you from testing out the application!

Ensure that you have the latest version of the SDK available - [Download from Microsoft](https://dotnet.microsoft.com/download/dotnet/6.0)

{{< alert icon="💡" text="Note : At the time of compiling this documentation, the latest version available was dotnet-sdk-6.0.100-rc.2.21505.57" />}}


## IDE

Visual Studio Code IDE is the recommended IDE to use for fullstackhero's .NET WebApi Boilerplate Project Development. If you are not already using this IDE, consider switching to it. It's definitely worth it! (_Fun Fact : I recently switched from Visual Studio 2019 Community to Visual Studio Code and it's been awesome!_)

However, you are always free to use your choice of IDEs as well.

Incase you intend to use Visual Studio Code for development, here are a bunch of helpful extensions that I use:
- EditorConfig for VS Code
- C#
- C# Extensions
- Docker
- Markdown All in One
- NuGet Gallery
- Material Icon Theme
- REST Client

{{< alert icon="💡" text="Note : All the screenshots included in these documentations are from Visual Studio Code Point of View." />}}

## Database Servers

fullstackhero's .NET WebApi Boilerplate gives you the freedom to choose between the following 3 popular Database Providers. Please note that with the current architecture of the API Project, it would rather be easy to add in support for more DB Providers with minimal change of code. But as of now, here are the 3 Supported Database Providers! By default, MSSQL is chosen as the Database Provider.

{{< alert text="Make sure that you have at least one of these servers installed, along with a Database Management tool like Azure Data Studio / PostgreSQL pgAdmin / MySQL Workbench " />}}


### MSSQL

There are high chances that you already have this installed on your machine. This is ideal for development and production for small-mid server applications.

- Check out the Community versions of this Server - [Get from Microsoft](https://www.microsoft.com/en-in/sql-server/sql-server-downloads)
- Download SQL Server Management Studio (SSMS) - [Get from Microsoft](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
- Download Azure Data Studio to browse your MSSQL Databases - [Get from Microsoft](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio)


### MySQL

- Check out the Community versions of this Server - [Get from mysql](https://dev.mysql.com/downloads/mysql/)
- Download MySQL Workbench - [Get from mysql](https://dev.mysql.com/downloads/workbench/)

### PostgreSQL

Probably the best Open Source Database Server with lots of Enterprise level features.
- Download postgresql Installer - [Get from postgresql.org](https://www.postgresql.org/download/)

## API Testing

When it comes to API Testing, Postman is the recommended tool. I have made sure to include a Postman Collection within the Repository under **/postman** folder to make sure you can test out all the existing endpoints. Note that there will be a detailed guide on how to use the given Postman Collection.
- Download Postman - [Get from postman.com](https://www.postman.com/downloads/)

## Community Tools

## Optionals

### Docker

