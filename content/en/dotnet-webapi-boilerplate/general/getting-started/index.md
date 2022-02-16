---
title: "Getting Started"
description: "Let's get started with the .NET WebApi Boilerplate!"
lead: "Let's get started with the .NET WebApi Boilerplate!"
date: 2021-08-30T00:59:34+05:30
lastmod: 2022-02-06T01:10:52+05:30
draft: false
images: []
menu:
  dotnet-webapi-boilerplate:
    identifier: "general-getting-started"
    name: "Getting Started"
    parent: "general"
weight: 3
toc: true
---

Firstly, make sure that you have already setup your development environment that runs the prerequisite tools and SDKs. Refer [Development Environment](/dotnet-webapi-boilerplate/general/development-environment/) for details.

This guide will take you right from installing the `fullstackhero .NET WebAPI Boilerplate` package to testing the API using the provided Postman Collection!

To get started with this Boilerplate, here are the avaiable options.

- Fork the Repository. Use this if you want to always keep your version of the Boilerplate up-to date with the latest changes.
- Install using dotnet new . Use this for release versions of the Boilerplate only.

## Forking the Repository

You would probably need to take this approach if you want to keep your source code upto date with the latest changes. To get started based on this repository, you need to get a copy locally. You have three options: fork, clone, or download.

- Make a fork of fullstackhero's `dotnet-webapi-boilerplate` repository in your Github account.
- Next, since you need to start your private personal project, create your new `dotnet-webapi-boilerplate` personal project by cloning the forked repository on your personal github. This could be done as simple as running `git clone https://github.com/{yourgithubuseraccount}/dotnet-webapi-boilerplate.git` locally on your development machine.
- Setup an upstream remote on your personal project pointing to your forked repository using command `git remote add upstream https://github.com/{yourgithubuseraccount}/dotnet-webapi-boilerplate` and `git remote set-url --push upstream DISABLE`

Now, whenever there is a new update on fullstackhero's `dotnet-webapi-boilerplate` repository, you could simply pull in the latest change on your private fork of the fullstackhero's `dotnet-webapi-boilerplate` repository and later merge these changes with you personal projects.

For step by step instructions, [follow this](https://discord.com/channels/878181478972928011/892573122186838046/933513103688224838) and [this](https://gist.github.com/0xjac/85097472043b697ab57ba1b1c7530274).


## Installing NuGet Package

This is by far the easiest and the most streamlined way of getting the latest available `Release version` of fullstackhero .NET WebApi Boilerplate.

Open up your Command Prompt / Powershell and run the following command to install the solution template.

```powershell
dotnet new -i FullStackHero.WebAPI.Boilerplate
```
or, if you want to use a specific version of the boilerplate, use

```powershell
dotnet new -i FullStackHero.WebAPI.Boilerplate::0.0.5-rc
```

{{< img src="install-fullstackhero.png" >}}

This would install the `fullstackhero .NET WebAPI Boilerplate` template globally on your machine. Do note that, at the time of writing this documentation, the latest available version is **0.0.5-rc** which is also one of the first pre-release version of the package. It is highly likely that there is already a newer version available when you are reading this.

> *To get the latest version of the package, visit [nuget.org](https://www.nuget.org/packages/FullStackHero.WebAPI.Boilerplate)*
>
> *FullStackHero.WebAPI.Boilerplate is now in pre-release state. You can find the latest version on NuGet.org*


## Creating your First Solution

Now that you have installed the template locally on your machine, let's see how you can start generating complete .NET WebAPI Solutions seamlessly.

Simply navigate to a new directory (wherever you want to place your new solution at), and open up Command Prompt at the opened directory.

Run the following command. Note that, in this demonstration I am naming my new solution as `FSH.Starter`.

```powershell
dotnet new fsh-api -o FSH.Starter
```

{{< img src="generate-solution.jpg" >}}

Once that is done, your new solution is created for you. As simple as that!

Here are the folders and files created for you.

{{< img src="folder-structure.jpg" >}}

## Alternatively..

When you installed the NuGet package, there is also an entry that has been created into your Visual Studio Template for fullstackhero's .NET WebAPI Boilerplate. If you find it easier to work with Visual Studio rather than CLI Commands to generate new solutions, you are free to do so.

Simply open up Visual Studio 2022 and Click on Create New Project.

{{< img src="visual-studio-support.jpg" >}}

Important - Make sure to check the 'Place solution and project in same directory' option. Else the solution and projects will be created on different folders and there will be build errors stating that few files are not found.

{{< img src="vs-same-directory.jpg" >}}

Another issue I noticed with creating solutions via Visual Studio is that the Solution structure might be lost. This is a very minor bug, that maybe someone can figure out and fix in our template configuration. Microsoft doesn't seem to have very detailed guide about this.

However, it's always recommended to create new solutions via the Console.

## Running the Application

Next, open up command prompt on this directory and run the following.

```powershell
code .
```

This opens up the solution via Visual Code. Make sure that you have the prerequisite tools and SDKs setup.

### Setting up the Connection String
Next, let's set up some valid connection strings. Navigate to `src/Host/Configurations` and open up `database.json`. Here you would have to provide a valid connection string under the `DatabaseSettings` to either MSSQL,  MySQL or PostgreSQL instance. Below are some sample settings for each of the DB Providers.

Details on the usage of other Settings will be explained in the upcoming documentations.

{{< alert text="It is important to update the src/Host/Configurations/hangfire.json connection string / provider as well." />}}

#### MySQL

```powershell
"DatabaseSettings": {
    "ConnectionString": "server=localhost;uid=root;pwd=root;database=defaultRootDb;Allow User Variables=True",
    "DBProvider": "mysql"
  }
```
#### MSSQL

```powershell
"DatabaseSettings": {
    "DBProvider": "mssql",
    "ConnectionString": "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=rootTenantDb;Integrated Security=True;MultipleActiveResultSets=True"
  }
```
#### PostgreSQL

```powershell
"DatabaseSettings": {
    "ConnectionString": "Host=localhost;Database=rootTenantDb;Username=postgres;Password=root;Include Error Detail=true",
    "DBProvider": "postgresql"
  }
```

#### Oracle

```powershell
{
  "DatabaseSettings": {
    "DBProvider": "oracle",
    "ConnectionString": "Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=49154))(CONNECT_DATA =(SERVER=DEDICATED)(SERVICE_NAME=ORCLPDB1.localdomain)));User Id=fullstack;Password=password123"
  }
}
```

Now you need to navigate to the `Host (API) Project` directory via CMD or VSCode's native terminal and run the basic build and run command to get the API up and running. Run the following.

```powershell
 cd src/Host
 dotnet build
 dotnet run
```

{{< img src="running-api.jpg" >}}

As you can see from the logs, a couple of operations happen as soon as you launch the application. Let me give a brief idea on what happens when you run the application for the very first time.

- The Migrations that already come out-of-the-box with the application gets applied. Note that you do not have to update the database.
- The Application is programmed to seed a default Tenant named `root`, that is basically the super-admin of the entire application and has permissions to manage tenants.
- Once Tenant record is seeded, the tenant admin , roles and permissions are also seeded. Note that the default credentials for the root tenant admin is as follows.

```powershell
{
    "email":"admin@root.com",
    "password":"123Pa$$word!"
}
```

- The Connection String that you provided in the appSettings will be taken as the `root` Tenant's Connection. Note that all the tenant data will be stored on to this connection under the Tenants table.

