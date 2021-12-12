---
title: "Logging"
description: "Understanding Logging in fullstackhero's Web API."
lead: "Understanding Logging in fullstackhero's Web API."
date: 2021-08-24T11:40:05+05:30
lastmod: 2021-12-12T11:21:11+05:30
draft: false
images: []
menu:
  webapi:
    identifier: "logging"
    name: "Logging"
    parent: "fundamentals"
weight: 11
toc: true
---
FullStackHero Web API has out of the box support for logging to several destinations. Thanks to the usage of Serilog! All of the configurations related to Logging can be found under `src/Host/Configurations/logger.json`.

## Console

Console Logging is enabled by Default. This is done directly in the C# code and not in the JSON Configurations. You can find the code snippet at the Host's Program.cs. Package used - `Serilog.Sinks.Console`

```
builder.Host.UseSerilog((_, config) =>
{
    config.WriteTo.Console()
    .ReadFrom.Configuration(builder.Configuration);
});
```

Here is how the logs show up on Console via Serilog.

{{< img src="console-logging.jpg" >}}

## File

Structured logging is the best part of using Serilog! It is possible to use JSON formatters to evenly log messages and warning to files in the local directory. Package used - `Serilog.Sinks.File`

```
"Name": "File",
"Args": {
  "path": "Logs/logs.json",
  "formatter": "Serilog.Formatting.Json.JsonFormatter, Serilog",
  "rollingInterval": "Day",
  "restrictedToMinimumLevel": "Information",
  "retainedFileCountLimit": 5
}
```

The above configurations ensures that the logs are structured and has a new filename every day. Since we do not want to use of a lot of memory to keep these logs, it's configured to keep the logs of the last 5 days only. Feel free to modify this. Also this only logs the messages that has a level of Information or above.

{{< img src="file-logging.jpg" >}}

## SEQ

Having a dashboard to analyze the logs and warning are always good to have. SEQ is one option for that. It collects application logs, filters it as you need, along with several other integrations.

Package used - `Serilog.Sinks.Seq`

Make sure you have SEQ installed and running on your machine / environment. SEQ is free for Individual use. Once setup, point to the SEQ Instance. It usually runs over the `5341` port.

```
"Name": "Seq",
"Args": {
  "serverUrl": "http://localhost:5341"
}
```


{{< img src="seq-logging.jpg" >}}

## Elastic Search

Now, the interesting part! Elastic Search with Kibana for Logging. You will need instances of Kibana and ElasticSearch running. To make things simpler, I have included a docker-compose `deployments\elk\docker-compose.elk.yml` which has references to both Kibana and ElasticSearch Images of version `7.16.0`.

Ensure that you have Docker installed on your machine along with the Docker Extensions for Visual Code (or your favorite IDE). From VS Code, you can simply right click `\deployments\elk\docker-compose.elk.yml` and click on Docker-Up. This would spin up the Kibana and ES instances for you in no time.

{{< img src="docker-elk.jpg" >}}

By default,
- Kiabana runs on port 5601 - http://localhost:5601
- Elastic Search runs on port 9200 - http://localhost:9200

Package used - `Serilog.Sinks.Elasticsearch`

```
"Name": "Elasticsearch",
"Args": {
  "nodeUris": "http://localhost:9200;",
  "indexFormat": "DN.WebApi-logs-{0:yyyy.MM}",
  "numberOfShards": 2,
  "numberOfReplicas": 1,
  "restrictedToMinimumLevel": "Information"
}
```

You can see that we are pointing to port 9200 from our configuration. This instructs Serilog to write the logs to ElasticSearch DB.

To view the logs on Dashboard, navigate to http://localhost:5601

Firstly, navigate to Kibana Spaces - http://localhost:5601/app/management/kibana/spaces

From the sidebar, select Index Patterns and create a new one.

In the Name field - put in `dn.webapi-logs*` or whatever you have set in your Serilog Configuration under `indexFormat`. Select the Timestamp field as `@timestamp`. That's it.

Now, go to http://localhost:5601/app/discover

{{< img src="kibana.jpg" >}}
