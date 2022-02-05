---
title: "API Testing"
description: "Testing fullstackhero's Web API"
lead: "Testing fullstackhero's Web API"
date: 2021-08-30T00:59:34+05:30
lastmod: 2021-11-23T01:55:29+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "api-testing"
    name: "API Testing"
    parent: "general"
weight: 4
toc: true
---
fullstackhero's Web API can be tested via Postman as well as the built in Swagger.

## Postman

Now that our application is up and running, let's fire up POSTMAN and run some basic requests. You can find the updated Postman collection under the /postman folder of your solution. Import this postman collection on to your local Postman.

Note that I have set up some default collection variables to make things easier.

{{< img src="postman-collection.jpg" >}}

In case your application happens to start on a different Port, you would have to change the `url` variable on this collection and save it.

### Generating Access Token

Let's start by generating a token for the `root admin` user! Navigate to the Identity/get-token request and simply run it. If everything goes as expected, you would be seeing a valid token as your response.

{{< img src="token-response.jpg" >}}

### Search Brands

Whenever a valid token is generated via Postman, it is stored as a variable of the collection and is used by default for all the subsequent requests via Postman until the token expires. You can test that the token is valid by sending the 'search-brands' request.

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

```powershell
{
    "data": [
        {
            "id": "623e0000-3f5a-3c7c-c326-08d9b2a1c527",
            "name": "Razor",
            "description": "Sample Data"
        },
        {
            "id": "623e0000-3f5a-3c7c-dce4-08d9b2a1c527",
            "name": "Samsung",
            "description": "Sample Data"
        },
        {
            "id": "623e0000-3f5a-3c7c-dd82-08d9b2a1c527",
            "name": "MSI",
            "description": "Sample Data"
        },
        {
            "id": "623e0000-3f5a-3c7c-ddb0-08d9b2a1c527",
            "name": "Huawei",
            "description": "Sample Data"
        }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 4,
    "pageSize": 10,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "messages": null,
    "succeeded": true
}
```

There you go.

###  Creating a New Brand

Open the **create-brands** request in Postman and run it. Click the 'Body' tab to review the values we'll be sending. After sending you should see a something like:

```powershell
{
    "data": "0f8e6d6e-d574-4d2f-b9ac-4dd1c9ffa0ae",
    "messages": [],
    "succeeded": true
}
```

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
