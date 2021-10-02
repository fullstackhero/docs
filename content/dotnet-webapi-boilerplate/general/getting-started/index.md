---
title: "Getting Started"
description: "Let's get started with the .NET WebApi Boilerplate!"
lead: "Let's get started with the .NET WebApi Boilerplate!"
date: 2021-08-30T00:59:34+05:30
lastmod: 2021-10-02T20:53:46+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "general-getting-started"
    name: "Getting Started"
    parent: "general"
weight: 3
toc: true
---
To start using fullstackhero .NET WebAPI Boilerplate, there are a couple of options.

But before that, make sure that you have already setup your development environment that runs the prerequisite tools and SDKs. Refer [Development Environment](/dotnet-webapi-boilerplate/general/development-environment/) for details.

This guide will take you right from installing the `fullstackhero .NET WebAPI Boilerplate` package to testing the API using the provided Postman Collection!

## Installing NuGet Package

This is by far the easiest and the most streamlined way of getting the latest available release version of fullstackhero .NET WebApi Boilerplate.

Open up your Command Prompt / Powershell and run the following command to install the solution template.

```powershell
dotnet new --install FullStackHero.WebAPI.Boilerplate::0.0.1-rc
```

{{< img src="install-fullstackhero.jpg" >}}

This would install the `fullstackhero .NET WebAPI Boilerplate` template globally on your machine. Do note that, at the time of writing this documentation, the latest available version is **0.0.1-rc** which is also the first pre-release version of the package. It is highly likely that there is already a newer version available when you are reading this.

*To get the latest version of the package, visit [NuGet.org](https://www.nuget.org/packages/FullStackHero.WebAPI.Boilerplate)*

{{< alert text="FullStackHero.WebAPI.Boilerplate is now in pre-release state. You can find the latest version on NuGet.org" />}}

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

## Running the Application

Next, open up command prompt on this directory and run the following.

```powershell
code .
```

This opens up the solution via Visual Code. Make sure that you have the prerequisite tools and SDKs setup.

### Setting up the Connection String
Next, let's set up some valid connection strings. Navigate to `src/Bootstrapper/` and open up `appSettings.json`. Here you would have to provide a valid connection string under the `MultitenancySettings` to either MSSQL,  MySQL or PostgreSQL instance. Below are some sample settings for each of the DB Providers.

Details on the usage of other Settings will be explained in the upcoming documentations.

#### MySQL

```powershell
"MultitenancySettings": {
    "ConnectionString": "server=localhost;uid=root;pwd=root;database=defaultRootDb;Allow User Variables=True",
    "DBProvider": "mysql"
  }
```
#### MSSQL

```powershell
"MultitenancySettings": {
    "DBProvider": "mssql",
    "ConnectionString": "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=rootTenantDb;Integrated Security=True;MultipleActiveResultSets=True"
  }
```
#### PostgreSQL

```powershell
"MultitenancySettings": {
    "ConnectionString": "Host=localhost;Database=rootTenantDb;Username=postgres;Password=root;Include Error Detail=true",
    "DBProvider": "postgresql"
  }
```

Now you need to navigate to the `Bootstrapper (API) Project` directory via CMD or VSCode's native terminal and run the basic build and run command to get the API up and running. Run the following.

```powershell
 cd src/Bootstrapper
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

## Testing the Postman Collection

Now that our application is up and running, let's fire up POSTMAN and run some basic requests. You can find the updated Postman collection under the /postman folder of your solution. Import this postman collection on to your local Postman.

Note that I have set up some default collection variables to make things easier.

{{< img src="postman-collection.jpg" >}}

Incase your application happens to start on a different Port, you would have to change the `url` variable on this collection and save it.

Let's start by generating a token for the `root admin` user! Navigate to the Identity/get-token request and simply run it. If everything goes as expected, you would be seeing a valid token as your response.

{{< img src="token-response.jpg" >}}

So,whenever a valid token is generated via Postman, it is stored as a variable of the collection and is used by default for all the subsequent requests via Postman until the token expires.




