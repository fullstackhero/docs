---
title: "Getting Started"
description: "Let's get started with the .NET WebApi Boilerplate!"
lead: "Let's get started with the .NET WebApi Boilerplate!"
date: 2021-08-30T00:59:34+05:30
lastmod: 2021-10-23T22:13:10+05:30
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
dotnet new --install FullStackHero.WebAPI.Boilerplate::0.0.3-rc
```

{{< img src="install-fullstackhero.jpg" >}}

This would install the `fullstackhero .NET WebAPI Boilerplate` template globally on your machine. Do note that, at the time of writing this documentation, the latest available version is **0.0.3-rc** which is also one of the first pre-release version of the package. It is highly likely that there is already a newer version available when you are reading this.

*To get the latest version of the package, visit [nuget.org](https://www.nuget.org/packages/FullStackHero.WebAPI.Boilerplate)*

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

In case your application happens to start on a different Port, you would have to change the `url` variable on this collection and save it.

Let's start by generating a token for the `root admin` user! Navigate to the Identity/get-token request and simply run it. If everything goes as expected, you would be seeing a valid token as your response.

{{< img src="token-response.jpg" >}}

Whenever a valid token is generated via Postman, it is stored as a variable of the collection and is used by default for all the subsequent requests via Postman until the token expires. You can test that the token is valid by sending the 'get-brands' request. Presuming that you have a valid token you'll see:

```powershell
{
    "data": [],
    "currentPage": 1,
    "totalPages": 0,
    "totalCount": 0,
    "pageSize": 2147483647,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "messages": [],
    "succeeded": true
}
```

This indicates a successful response but the empty data value indicates that the db doesn't have any Brands yet. Time to fix that!

##  Adding Data

Open the **create-brands** request in Postman and run it. Click the 'Body' tab to review the values we'll be sending. After sending you should see a something like:

```powershell
{
    "data": "0f8e6d6e-d574-4d2f-b9ac-4dd1c9ffa0ae",
    "messages": [],
    "succeeded": true
}
```

Resend the **'search-brands'** request to see:

```powershell
{
    "data": [
        {
            "id": "2c87358e-0bfa-4d69-8d20-c2fd3b043e0f",
            "name": "Brand #2",
            "description": "Something Cool!"
        }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 1,
    "pageSize": 2147483647,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "messages": [],
    "succeeded": true
}
```

Next let's add a product. Run the **'create-product'** request at this point and you'll see a failure message:

```powershell
{
    "source": "DN.WebApi.Application",
    "exception": "brand.notfound [en-US]",
    "errorCode": 404,
    "succeeded": false
}
```

What went wrong?? Click the '**Body**' tab and look at the value for the _brandId_. That field needs to match the _ID_ value of the **Brands** table. When I created the Postman collection I had to use the values that existed while I was building the project from my workstation. If you revisit the '**search-brands**' request and look at the results you'll see a value for '_id_'. Copy that value - return to the `**create-product**' request - replace the id value with what you'd copied and re-send the command. It should report success now.

## Important Commands

### Docker

#### Build

This command is to be executed from the root folder of the project.

```powershell
docker build -t iammukeshm/dotnet-webapi:0.0.3-rc -t iammukeshm/dotnet-webapi:latest  .
```
#### Push to DockerHub

This command is to be executed from the root folder of the project.

```powershell
docker push iammukeshm/dotnet-webapi
```

### Migrations
This command is to be executed from the Bootstrapper Directory of the project.

```powershell
dotnet ef migrations add <CommitMessage> --project .././Migrators/Migrators.<Provider>/ --context ApplicationDbContext -o Migrations/Application
```
CommitMessage : Enter a commit message here.
Provider : Enter the available DB Provider name. MSSQL , MySQL , PostgreSQL

### NuGet

Generates a NuGet Package of the entire solution. NuGet Configuration is available in the *.nuspec file at the root of the project directory. This command is to be executed from the Root Directory of the project.

```powershell
nuget pack -NoDefaultExcludes
```
