---
title: "Development Environment"
description: "Setting up the Development Environment for the .NET WebApi Boilerplate"
lead: "Let's get started with setting up the Development Environment for .NET WebApi Boilerplate Development!"
date: 2021-08-30T00:59:34+05:30
lastmod: 2021-09-10T05:41:45+05:30
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
fullstackhero's **.NET WebApi Boilerplate** Project Development needs you to have the following applications / tools available on your machine. Please Note that this project is being built on a Windows 10 Machine.

## .NET SDK

As mentioned earlier, this project is built on the latest available .NET SDK, which is .NET 6.0. Since the SDK is currently at preview, the project will be released by Mid-November as soon as Microsoft launches .NET 6.0 LTS SDK. But that doesnt stop you from testing out the application!

Ensure that you have the latest preview version of the SDK available - [Download from Microsoft](https://dotnet.microsoft.com/download/dotnet/6.0)

{{< alert icon="💡" text="Note : At the time of compiling this documentation, the latest version available was dotnet-sdk-6.0.100-rc.1.21458.32" />}}


## IDE

Visual Code IDE is the recommended IDE to use for fullstackhero's .NET WebApi Boilerplate Project Development. If you are not already using this IDE, consider switching to it. It's definitely worth it! (_Fun Fact : I recently switched from Visual Studio 2019 Community to Visual Code and it's been awesome!_)

Also note that I use Visual Studio 2022 Preview Community Version at times.

However, you are always free to use your choice of IDEs as well.

Incase you intend to use Visual Code for development, here are a bunch of helpful extensions that I use:
- EditorConfig for VS Code
- C#
- C# Extensions
- Docker
- Markdown All in One
- NuGet Gallery
- Material Icon Theme
- REST Client

## Database Servers

fullstackhero's .NET WebApi Boilerplate gives you the freedom to choose between the following 3 popular Database Providers. Please note that with the current architecture of the API Project, it would rather be easy to add in support for more DB Providers with minimal change of code. But as of now, here are the 3 Supported Database Providers!

{{< alert text="Make sure that you have atleast one of these servers installed, alongwith a Database Managment tool like Azure Data Studio / PostgreSQL pgAdmin / MySQL Workbench " />}}


### MSSQL

There are high chances that you already have this installed on your machine. This is ideal for development and production for small-mid server applications.

Check out the Community versions of this Server - [Get from Microsoft](https://www.microsoft.com/en-in/sql-server/sql-server-downloads)

Download SQL Server Management Studio (SSMS) - [Get from Microsoft](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)



### MySQL

### PostgreSQL

## API Testing

## Community Tools

## Optionals

### Docker

