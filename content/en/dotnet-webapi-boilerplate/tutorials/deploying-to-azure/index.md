---
title: "Deploying to Azure AppService"
description: "Deploying fullstackhero's Web API to Azure AppService from Visual Studio"
lead: "Deploying fullstackhero's Web API to Azure AppService  from Visual Studio"
date: 2022-05-12T21:30:38+05:30
lastmod: 2022-05-12T21:30:33+05:30
draft: false
images: []
menu:
  dotnet-webapi-boilerplate:
    identifier: "deploying-to-azure"
    name: "Deploying to Azure AppService"
    parent: "tutorials"
weight: 14
toc: true
---

To Get started, Insure you `Signin` in `Visual Studio` `2019` or `2022` with an account registered in `Azure Portal` and having an active `subscription`

Step 1: Right click Host project as shown on the picture below and click Publish

{{< img src="azuredeployment-pic1.png" >}}

Step 2: Select Azure from the Dialog as shown below and click Next

{{< img src="azuredeployment-pic2.png" >}}

Step 3: Select Azure App Service (Windows) as shown below and click Next

{{< img src="azuredeployment-pic3.png" >}}

Step 4: Click the green Plus(+) button to create an new `App Service Instance`. Notice the `Subscription` name, you must select your active subscription.

{{< img src="azuredeployment-pic4.png" >}}

Step 5: Write your `Api` name, this will form part of your application link(url)
Select same `Subscription` name as previously
Click New on `Resource group` to create new resource group.

{{< img src="azuredeployment-pic5.png" >}}

Step 6: Write a `Resource group` name, this is a grouping for resource to be created in Azure. I wrote `Mango-RG`, write your own `resource group` name. Click Ok to save it.

{{< img src="azuredeployment-pic6.png" >}}

Step 7: Notice Our `Resource group` name appears. Now click New to create a new `Hosting plan`

{{< img src="azuredeployment-pic7.png" >}}

Step 8: Give a `Hosting Plan` name, `Location` I kept the default, but you may need to select the closest area to you. Click dropdown on `Size`, select `Free`, this is a free plan, you are welcome to choose any you can afford through your subscription. Click Ok. 

{{< img src="azuredeployment-pic8.png" >}}

Step 9: Click Create as shown below, at this point your resources will be created in `Azure Portal`

{{< img src="azuredeployment-pic9.png" >}}

Step 10: Notice your `Api` Application instance has been created. Now Click finish.

{{< img src="azuredeployment-pic10.png" >}}

Step 11: At this point we can see all our resources. 
Before we start configuring, do the following
Install these packages in `Host` project, make sure they are of the same `version` as installed in `Infrastructure`. Doing this help avoid errors later.

* Microsoft.EntityFrameworkCore.SqlServer
* Microsoft.EntityFrameworkCore.Tools

Now back to publish tab in `Visual Studio`.
Click Configure under Service Dependencies to create `database` resources.

{{< img src="azuredeployment-pic11.png" >}}

Step 12: Select `Azure SQL Database` to create database hosted in `Azure`. Click Next

{{< img src="azuredeployment-pic12.png" >}}

Step 12: Select the same `subscription` as before. Click the green Plus(+) button to create `database server` and `database` in `Azure`.

{{< img src="azuredeployment-pic13.png" >}}

Step 13: Give a `database` name, notice the validation error! A `database server` needs to be first created. Now click the New button to create it.

{{< img src="azuredeployment-pic14.png" >}}

Step 14: Give `database server` name, Location (nearest to you), admin `username` (used to access this `database server`) and `password`. Click Ok, to start creating the `server` and `database` in `Azure Portal`. This will take few minutes. NB note down username and password. I usually add them to a notepad.

{{< img src="azuredeployment-pic15.png" >}}

Step 15: Notice our `database server` and `database` are created, see within green block. Now select this row and click Next.

{{< img src="azuredeployment-pic16.png" >}}

Step 16: Fill in `ConnectionString` key as it in `appsetting.json`, mine is `DefaultConnection`,
`Username` and `Password` create in Step 14. Click the green block to copy the connection and save it on notepad or anywhere you will be able to find it. Click None

{{< img src="azuredeployment-pic17.png" >}}

Step 17: Click finish and restore of `NuGet packages` will begin. Make sure `NuGet packages` is checked.

{{< img src="azuredeployment-pic18.png" >}}

NB. If you get an error, follow Step 11. The error is caused by package restore for `Host` project, it needs `Microsoft.EntityFrameworkCore.SqlServer` and 
`Microsoft.EntityFrameworkCore.Tools` for database migration. The tool tries to install them for you but it only picks versions `6.0.0` which are not the same versions as those installed in `Infrastructure`. Get that?

You will be taken back to Step 12 but don’t panic, you won’t have to create `database` and `database server` as they are already created.


The restore should be successful as shown below.

{{< img src="azuredeployment-pic19.png" >}}

Click Close

NB. Replace the `ConnectionStrings` in both `database.json` and `hangfire.json` with the one you have just created above. This means you’re `Api` will now point to `Azure` database server.

Step 18: Login Azure Portal to verify all resources we have just created. Notice all our resources are on the list. Nice. Now let go to `Visual Studio` and `deploy` our `Api`

{{< img src="azuredeployment-pic20.png" >}}

Step 19: In `Visual Studio`, Click Publish (green block), this mean you are now `deploying` you `Api` to the `Azure` and can be access on the internet using the url on Site as indicated on the picture.

{{< img src="azuredeployment-pic21.png" >}}

Publish is successful and the `Api` was automatically launched in a browser

{{< img src="azuredeployment-pic22.png" >}}

Deployment error as the `Api` is launched in the browser.

{{< img src="azuredeployment-pic23.png" >}}

Step 20: This error is caused by `Azure` blocking all public access to the `database server` via IP address. 

To see this on the Log file that our application generate, do the following
1.	Open a new tab in your browser
2.	Write your `Api` url and add `.scm` before `azurewebsites.net`
Example: `https://mangoapi-test.scm.azurewebsites.net/`
3.	This is a Kudu dashboard that can be used for debuging your deployed applications, in our case we are debugging our `Api`
4. Click on Debug console as indicated by an arrow, select CMD

{{< img src="azuredeployment-pic24.png" >}}

5. Click `site`

{{< img src="azuredeployment-pic25.png" >}}

6. Click `wwwroot`

{{< img src="azuredeployment-pic26.png" >}}

7.	Look for `Logs` folder

{{< img src="azuredeployment-pic27.png" >}}

8. Click the download icon where the arrow points to, this should open a new browser tab with your `log` file.

{{< img src="azuredeployment-pic28.png" >}}

This is what the `log` exception says

Microsoft.Data.SqlClient.SqlException (0x80131904): Cannot open server `'mangotestdbdbserver'` requested by the login. Client with IP address `'20.****.40.0'` is not allowed to access the server.  To enable access, use the Windows Azure Management Portal or run `sp_set_firewall_rule` on the `master database` to create a `firewall rule` for this IP address or address range.

I now need to grant this `IP address` access to my `database server` in `Azure Portal`


9. Go to the `database server` you have created, in my case is `mangotestdbserver`

{{< img src="azuredeployment-pic30.png" >}}

Click on `SQL databases` to view your `database`, it will appear in the table, click it.

{{< img src="azuredeployment-pic31.png" >}}

10.	Click `Set server firewall` within the red block

{{< img src="azuredeployment-pic32.png" >}}

11.	Click Add a `firewall rule`

{{< img src="azuredeployment-pic33.png" >}}

12.	On the dialog I add my local `IP address` (suggested by azure) and `IP address` as show from the `log` because I want this `IP address` and my local machine to have access to the `SQL Server`

{{< img src="azuredeployment-pic34.png" >}}

Click Save

Go to `Visual Studio` and Click Publish (Step 19)

Now the launched browser shows `404`, relax you have done it.

{{< img src="azuredeployment-pic36.png" >}}

To view `Api` documentation in `swagger`, append `/swagger/index.html` to the `url` and you should see your `api`. 

See below

{{< img src="azuredeployment-pic37.png" >}}

## Testing via Postman

You are welcome to use any `Api` client you like for testing.

Add your deployed `Api` `url` like I did below

{{< img src="azuredeployment-pic38.png" >}}

Let’s test `get-token` endpoint

{{< img src="azuredeployment-pic39.png" >}}

Click Sent

I get a response back and it includes a token as expected!!!! 

{{< img src="azuredeployment-pic40.png" >}}

That’s it guys, hope this can help someone. Screenshots are not of the best quality.

The deployed `Api` can be accessed here `https://mangoapi-test.azurewebsites.net/swagger/index.html`