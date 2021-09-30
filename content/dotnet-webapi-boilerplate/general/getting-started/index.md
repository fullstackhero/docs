---
title: "Getting Started"
description: "Let's get started with the .NET WebApi Boilerplate!"
lead: "Let's get started with the .NET WebApi Boilerplate!"
date: 2021-08-30T00:59:34+05:30
lastmod: 2021-08-30T00:59:26+05:30
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

## NuGet Package

This is by far the easiest and the mmot streamlined way of getting the latest available release version of fullstackhero .NET WebApi Boilerplate.

Open up your Command Prompt / Powershell and run the following command to install the solution template.

```powershell
dotnet new --install FullStackHero.WebAPI.Boilerplate::0.0.1-rc
```

{{< img src="install-fullstackhero.jpg" >}}

This would install the `fullstackhero .NET WebAPI Boilerplate` template globally on your machine. Do note that, at the time of writing this documentation, the latest available version is **0.0.1-rc** which is also the first pre-release version of the package. It is highly likely that there is already a newer version available when you are reading this.

*To get the latest version of the package, visit [NuGet.org](https://www.nuget.org/packages/FullStackHero.WebAPI.Boilerplate)*

{{< alert text="FullStackHero.WebAPI.Boilerplate is now in pre-release state. You can find the latest version on NuGet.org" />}}

Now that you have installed the template locally on your machine, let's see how you can start generating complete .NET WebAPI Solutions seamlessly.

Simply navigate to a new directory (whereever you want to place your new solution at), and open up Command Prompt at the opened directory.

Run the following command. Note that, in this demonstration I am naming my new solution as `FSH.Starter`.

```powershell
dotnet new fsh-api -o FSH.Starter
```

{{< img src="generate-solution.jpg" >}}

Once that is done, your new solution is created for you. As simple as that!

Here are the folders and files created for you.

{{< img src="folder-structure.jpg" >}}


