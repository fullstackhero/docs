---
title: "API Testing"
description: "Testing fullstackhero's Web API"
lead: "Testing fullstackhero's Web API"
date: 2021-08-30T00:59:34+05:30
lastmod: 2021-11-23T01:55:29+05:30
draft: false
images: []
menu:
  dotnet-webapi-boilerplate:
    identifier: "api-testing"
    name: "API Testing"
    parent: "general"
weight: 4
toc: true
---
fullstackhero's Web API can be tested via Postman as well as the built in Swagger.

Once the WebAPI is up and running (by default of port 5001 of localhost), here are the ways to test the functionalilty easily.

## Swagger

Navigate to https://localhost:5001/swagger/index.html

{{< img src="swagger.png" >}}

Here you can see all the available endpoints. Since all of the endpoints except the login and registration endpoints are secured, you would need a Authentication Token to access these services.

Let's see how to generate a token via Swagger.

You would have to the /token endpoint for this.

{{< img src="swagger-request.png" >}}

As mentioned earlier, the default credentials are

```
{
    "email":"admin@root.com",
    "password":"123Pa$$word!"
}
```

and the default tenant is `root`. Once you send a POST request to the /token endpoint with these parameters, the API would return a valid JWT token which can be used to authenticate your further requests to various other endpoints of the API.

Below is the response sent by the API.

{{< img src="swagger-response.png" >}}

Once you have the token, simply copy it , click on the Authoize button (found at the top of the Swagger UI) and paste the token as shown below. This makes sure that the token is sent alongwith all the requests as an Auth Header.

{{< img src="swagger-header.png" >}}




## Postman

Now that our application is up and running, let's fire up POSTMAN and run some basic requests. You can find the updated Postman collection under the /postman folder of your solution or [here](https://github.com/fullstackhero/dotnet-webapi-boilerplate/blob/main/postman/dotnet.webapi.boilerplate.postman_collection.json). Import this postman collection on to your local Postman.

Note that I have set up some default collection variables to make things easier.

{{< img src="postman-collection.png" >}}

In case your application happens to start on a different Port, you would have to change the `url` variable on this collection and save it.

### Generating Access Token

Let's start by generating a token for the `root admin` user! Navigate to the Identity/get-token request and simply run it. If everything goes as expected, you would be seeing a valid token as your response.

Note that here, we are passing the tenant header as `root`

{{< img src="token-response.png" >}}

Whenever a valid token is generated via Postman, it is stored as a variable of the collection and is used by default for all the subsequent requests via Postman until the token expires. By default, tokens have a lifetime of 60 minutes which is configurable via the `Host/Configurations/security.json` under `SecuritySettings / JwtSettings / tokenExpirationInMinutes`.

### Search Brands

 You can test that the token is valid by sending the 'search-brands' request.

Your request body would look somewhat like this:

```powershell
{
  "keyword": "",
  "pageNumber": 0,
  "pageSize": 10,
  "orderBy": [
    "id"
  ]
}
```
So, by default as soon as your application in run for the first time, a couple of Brands are seeded into the database for demo purposes.

The *keyword* parameter in the above request denotes the keyword you want to search for in the brands table. Let's leave it empty for now and let all the other parameters stay unchanged.

Presuming that you have a valid token you'll see:

{{< img src="search-brand.png" >}}

```powershell
{
    "data": [
        {
            "id": "ca6247e8-3d7a-4c04-8d64-08d9f76d2c72",
            "name": "Razor",
            "description": "Sample Data"
        },
        {
            "id": "c5b447c6-a518-4268-8d65-08d9f76d2c72",
            "name": "Samsung",
            "description": "Sample Data"
        },
        {
            "id": "bb49e53d-9149-41d3-8d66-08d9f76d2c72",
            "name": "MSI",
            "description": "Sample Data"
        },
        {
            "id": "3214bf2d-9a0d-454e-8d67-08d9f76d2c72",
            "name": "Huawei",
            "description": "Sample Data"
        }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 4,
    "pageSize": 10,
    "hasPreviousPage": false,
    "hasNextPage": false
}
```
### Create a new Brand

Let's create a new Brand. Open up Catalog/Brands/create-brand request via Postman and POST the following body.

```
{
    "name":"Bra1nod #29",
    "description":"Something Cool!"
}
```
Once you send your request and things work as expected, the API would send back a 200 Status Code along with your new Brand's ID as shown below.

{{< img src="create-brand.png" >}}

Resend the **'search-brands'** request to see your new brand listed in the response!

### Create a new Product

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
