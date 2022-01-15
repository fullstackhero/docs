---
title: "Adding Database Migrations for Entity Framework Core"
description: "Adding Database Migrations for Entity Framework Core with fullstackhero's Web API"
lead: "Adding Database Migrations for Entity Framework Core with fullstackhero's Web API"
date: 2022-01-15T21:31:40+05:30
lastmod: 2022-01-15T21:31:44+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "database-migrations"
    name: "Database Migrations"
    parent: "tutorials"
weight: 12
toc: true
---

So, you have already added new entities into the Domain project, modified an existing entity or want to recreate all the pre-generated migrations? Here is how to proceed.

Note that currently, fullstackhero's Web API supports the following major DB Providers,
1. MSSQL
2. MySQL
3. PostgreSQL
4. Oracle

Download links to setup the supported Database providers are mentioned here - https://fullstackhero.net/dotnet-webapi-boilerplate/general/development-environment/

To maintain scalability, the database migrations of each of these DB Providers are kept in separate class library projects namely
1. Migrators/Migrators.MSSQL
2. Migrators/Migrators.MySQL
3. Migrators/Migrators.PostgreSQL
4. Migrators/Migrators.Oracle

Out of the box, the default migrations are already generated and is made available for you. This means you would'nt even have to run a `update-database` to get started. The Application startup already handles it for you.

As of now, fullstackhero's Web API consists of the following EF Core DB Context classes,
1. ApplicationDbContext - This is where you would ideally reference your new entities. By default, Catalog entities are referenced here.
2. TenantDbContext - Related to Finbuckle's Multitenancy setup of Stores.

which are maintained as 2 different sub-folders under each of the Migrator projects named as `Application` and `Tenant` folders.

To start with generating the database migrations, open your terminal on to the Host Project.

Note that steps are almost same for all the Database providers. But make sure that you got to have the respective connection string of the Database Provider in the `database.json` and `hangfire.json` to continue.

Meaning, if you intend to create / update migrations for MySQL,
1. You have to ensure that you have the MySQL Server up and running on your development machine.
2. You have a valid connection string to the MySQL Server updated on both the `database.json` and `hangfire.json` configuration files. This also assumes that you have updated `"DBProvider": "mysql"` too.

Below are some sample configurations for MySQL Provider. The above is applicable to all the other DB Provider.

#### database.json

```
{
  "DatabaseSettings": {
    "ConnectionString": "server=localhost;uid=root;pwd=root;database=defaultRootDb;Allow User Variables=True",
    "DBProvider": "mysql"
  }
}
```
#### hangfire.json

```
...
"Storage": {
  "StorageProvider": "mysql",
  "ConnectionString": "server=localhost;uid=root;pwd=root;database=defaultRootDb;Allow User Variables=True",
...
```

The Provider values for other supported DBs are as follows.
- MSSQL - **mssql**
- PostgreSQL - **postgresql**
- Oracle - **oracle**

Once your connection strings are all updated in the mentioned configuration files, open up the command terminal on the Host Project's directory and run the following commands.

As mentioned earlier, since we have 2 Db Contexts defined in our application, we will have seperate commands for each of the available context classes.

The generic command to add migrations over the **Application Db Context** goes like this,

```
dotnet ef migrations add <CommitMessage> --project .././Migrators/Migrators.<DBProvider>/ --context ApplicationDbContext -o Migrations/Application
```

where
- `<CommitMessage>` should be replaced by an appropriate name that describes the Migration
- `<DBProvider>` should be replaced by your selected Database Provider (`MSSQL`, `MySQL`, `Oracle` or `PostgreSQL`)

The generic command to add migrations over the **Tenant Db Context** goes like this,

```
dotnet ef migrations add <CommitMessage> --project .././Migrators/Migrators.<DBProvider>/ --context TenantDbContext -o Migrations/Tenant
```

where
- `<CommitMessage>` should be replaced by an appropriate name that describes the Migration
- `<DBProvider>` should be replaced by your selected Database Provider (`MSSQL`, `MySQL`, `Oracle` or `PostgreSQL`)

Keeping that in mind, here is how you would add Migrations for MySQL.

1. Ensure that you have updated the connection string and dbProvider properties of both hangfire.json and database.json configuration files.
2. Open up the command terminal on the Host Project's directory.
3. To add migrations related to ApplicationDbContext, run

```dotnet ef migrations add AddedMenuEntity --project .././Migrators/Migrators.MySQL/ --context ApplicationDbContext -o Migrations/Application```

4. To add migrations related to TenantDbContext, run

```dotnet ef migrations add ModifiedTenantTable --project .././Migrators/Migrators.MySQL/ --context TenantDbContext -o Migrations/Tenant```

That's almost it. Once the process is completed you would be able see new Migration cs files that represent your new additions / modifications at the table level added to the respective Migrator project.

You do not have to do anything extra to apply the migrations to your database. The application does it for you during the startup. Cheers!
