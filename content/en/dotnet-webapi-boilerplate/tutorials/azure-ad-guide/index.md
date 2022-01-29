---
title: "Setting up Azure AD Authentication"
description: "Setting up Azure AD Authentication with fullstackhero's Web API"
lead: "Setting up Azure AD Authentication with fullstackhero's Web API"
date: 2021-08-30T00:59:34+05:30
lastmod: 2021-11-29T00:44:06+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "azure-ad-guide"
    name: "Azure AD Authentication"
    parent: "tutorials"
weight: 12
toc: true
---

For the Azure AD integration to work with this template, you have to create 2 `App Registrations` under your Azure AD tenant with the right settings, and then fill out the `AzureAd` section in `Configurations/security.json` to hook those apps up. This guide will walk you through doing all that.

## Create the FSHApi Application Registration

* Log into the azure portal and go to the [Azure Active Directory blade](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade). Make sure you are in the directory where you want your apps to be registered. You can switch directories by clicking on your account info in the top right corner.

* Under `Manage`, click on `App registrations`, and click the `New registration` button on top:
{{< img src="new-registration.png" >}}

* Fill in `FSHApi` (or whichever name you want for this app) as `Name`. Under `Supported account types` select `Accounts in any organizational directory - Multitenant` and click on `Register`:
{{< img src="register-api.png" >}}

### Expose the Api

* On the newly created App's blade, under `Manage`, click on `Expose an API`, then click on `Add a scope`:
{{< img src="add-scope-1.png" >}}

* An `Application ID URI`q will automatically be filled out. Click on `Save and continue`:
{{< img src="add-scope-2.png" >}}

* On the next screen, fill in `access_as_user` as `Scope name`, select `Admins and users` as `Who can consent?` and fill out the display names and descriptions like in the screenshot below, then click on `Add scope`:
{{< img src="add-scope-3.png" >}}

### Add App roles

* Under `Manage`, click on `App roles` and click the `Create app role` button on top:
{{< img src="create-app-role-1.png" >}}

* Fill in `Administrators` as Display name and `Admin` as value. Especially the value is important, as this has to match the name of the role in the FSH application itself. Click on Apply:
{{< img src="create-app-role-2.png" >}}

* In the same way, create app roles for the other roles in your application (by default the only other role is the `Basic` role).

## Assign App roles to specific users in AzureAD

You will have to assign those freshly created App roles to the AzureAd users to which you want to grant access to your application:

* On the [Azure Active Directory blade](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade), under `Manage` click on `Enterprise applications` and select the FSHApi application:
{{< img src="assign-app-roles-1.png" >}}

* Under `Manage`, click on `Users and groups` and click the `Add user/group` button on top:
{{< img src="assign-app-roles-2.png" >}}

* On the next screen, you can select one or more users/groups, select an App role and click on the `Assign` button to assign the role the the specified users/groups.

## Create the Client Application Registration

* Go back again to the [Azure Active Directory blade](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade) and under `Manage`, click on `App registrations`, and click the `New registration` button on top again.

* This time, fill out `FSHClient` as Name, choose again for `Accounts in any organizational directory - Multitenant` and under `Redirect URI`, select `Single-page application (SPA)` and fill out the url `https://localhost:5001/swagger/oauth2-redirect.html`. Click on `Register`:
{{< img src="register-api.png" >}}

### Add permission for the Api

* On the newly created App's blade, under `Manage`, click on `API permissions` and click the `Add a permission` button:
{{< img src="add-permission-1.png" >}}

* On the next view, under `Select an API`, click on `My APIs` and select FSHApi:
{{< img src="add-permission-2.png" >}}

* Then, under `Select permissions`, check the `access_as_user` permission and click on `Add permissions`:
{{< img src="add-permission-3.png" >}}

### Add Blazor Client application

This should be enough for testing from swagger. But you'll probably will want to use the client application as well. There's 2 options here. Or you can add the `Redirect URI` for the client application to the same App registration you just created (click on `Authentication` under `Manage` and then on `Add URI`), or you can create a whole new client app registration specifically for this client, just like described in the steps above, but with another `Redirect URI`. In any case, the `Redirect URI` for the blazor app you will want to use is `https://localhost:5002/authentication/login-callback`.

## Update the AzureAd settings on the Web Api project

Now that's all set up, the only thing left is updating the configuration to use AzureAd. 
On the Web API project, under `src\Host\Configurations`, open `security.json` and fill out the required settings:

* `Provider`: set to `AzureAd`
* `Instance`: set to `https://login.microsoftonline.com/`
* `Domain`: you can find your domain in the Azure Active Directory blade on the `Overview` page under `Primary domain`.
* `TenantId`: set to `organizations`
* `ClientId`: set to the `Application (client) ID` of the FSHApi App registration (you can find this on the `Overview` page of the App registration in Azure)
* `Scopes`: set to `access_as_user`
* `RootIssuer`: set to `https://sts.windows.net/<Your Tenant ID>/` (your `Tenant ID` is also on the `Overview` page of the Azure Active Directory blade)

Then for swagger to work you need the following settings under the `Swagger` node in `security.json`:

* `AuthorizationUrl`: set to `https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize`
* `TokenUrl`: set to `https://login.microsoftonline.com/organizations/oauth2/v2.0/token`
* `ApiScope`: set to the full name of the api scope we created in the FSHApi App registration above (`api://<ClientId of the FSHApi App registration>/access_as_user`)
* `OpenIdClientId`: set to the `Application (client) ID` of the FSHClient App registration (or the one you specifically created for swagger).

## Update the AzureAd settings on the Blazor Client project

Then for the blazor client to work, you need the following settings over there in the `wwwroot/appsettings.json` file:

* `AuthProvider`: set to `AzureAd`
* `Authority`: set to `https://login.microsoftonline.com/organizations`
* `ClientId`: set to the `Application (client) ID` of the FSHClient App registration (or the one you specifically created for the blazor client).
* `ValidateAuthority`: set to `true`
* `ApiScope`: set to the full name of the api scope we created in the FSHApi App registration (`api://<ClientId of the FSHApi App registration>/access_as_user`) same as before with the swagger client.

## Configuration for Postman

TODO - Coming soon

## Test it out

* Start the Web API project and browse to `https://localhost:5001/swagger` when you click on the `Authorize` button on the top right, you should be redirected to the Microsoft login site. Log in with a user to which you granted app roles and you should be redirected back to swagger with the padlock closed. When you now issue an api call, the Authorization header should be sent with the bearer token received from AzureAd.

* Start the Blazor Client project and browse to `https://localhost:5002/`. You should be immediately redirected to the Microsoft login site. And after logging in, you should be redirected back to the homepage of the blazor client.

## AzureAd and multitenancy

About the `RootIssuer`setting in `security.json`. This should be set to the issuer of the root tenant in AzureAd. When someone is logging in from that AzureAD tenant, the local root tenant will automatically be selected.

For the other tenants there's an "issuer" field in the tenants table to map those. There's still a part which has to be implemented for mutltiple tenants from AzureAd though, as there needs to be some kind of "onboarding" experience inside AzureAD when a new tenant needs access to you application. See https://docs.microsoft.com/en-us/azure/architecture/multitenant-identity/signup for more info about this.

## AzureAd users/roles vs. local users/roles

In any case, with AzureAd, when a user logs in and there doesn't exist a local user yet in the local tenant for that AzureAd user/tenant, one gets created automatically. It will also immediately have the same roles assigned like the ones in AzureAd. When an already existing user logs in and there are roles in AzureAd for that user which are not yet assigned to the local user, they will automatically be assigned. Currently there will never be any roles removed from a user. So removing the role assignment from AzureAd will not automatically remove it from the local user when he logs in. This to allow for people to use the role/permission management inside the app without having to do it in Azure.
