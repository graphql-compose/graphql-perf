# graphql-perf
Gather performance information from GraphQL `resolve` methods and prepare JSON in Trace Event Format for Chrome Devtools Timeline tab.

<img width="772" alt="screen shot 2016-11-05 at 9 51 50" src="https://cloud.githubusercontent.com/assets/1946920/20027396/b8c78a22-a33d-11e6-8aca-b70216ad5544.png">

### Current plans/aims/thoughts:
- VIEW: responsive timeline graphics in Google Chrome Devtools
  - just click a link in browser console or press a button in extension
  - you will measure only current request
  - no need to setup special server or buy subscription [Apollo Optics](http://www.apollodata.com/optics) 
  - if you need aggregated statistics use Apollo Optics)
- NODEJS SERVER: should work with any GraphQL Schema under nodejs
  - but if schema built with https://github.com/nodkz/graphql-compose-mongoose (and other `graphql-compose` libs) will have additional profiling info
  - should have api that allows other libs to provide extended perf metrics
  - will integrate it with `express-graphql` 
  - but also may be integrated with `apollo-server` and others
- CLIENT: should have link, button, extension that open 
  - perf data will be in the json-response from graphql server under `extensions.perf` path in it. 
  - will integrate it with https://github.com/nodkz/react-relay-network-layer
  - so needs help in passing this data to devTools timeline (some link or chrome extension) or another way. 
- OTHER SERVERS: 
  - maybe somebody writes for other languages similar perf export in Trace Event Format under **[extensions](https://github.com/graphql/express-graphql#providing-extensions).perf** path in graphql response.

**I'll try to start it at the end of November/December. Too much work right now.**

> Did you have experience with Trace Event Format? Or maybe want help? Or start to develop such thing right now? Or maybe can recommend additional sources/articles? Feel free to open issue. Will be glad to any help and thoughts.

### How it should work under the hood
This package should traverse by types and fields (of provided GraphQL Schema instance) wraps all resolvers and return new wrapped Schema in build phase (when starts node your server). After that for every request, when server gets `?perf=1` param (or some other key in headers) it will pass wrapped schema to graphql-express, otherwise for regular users your initial schema for performance reasons. It will be save use it in production, without loosing performance.
Gathered trace information should be written to the GraphQL response extensions.perf key in the Trace Event Format.

### Useful links
- [[RFC] Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/edit#heading=h.yr4qxyxotyw)
- [[Article] In-depth: Using Chrome://tracing to view your inline profiling data](http://www.gamasutra.com/view/news/176420/Indepth_Using_Chrometracing_to_view_your_inline_profiling_data.php)
- [[Repo:Client] Chrome devtools extension to generate a URL for your timeline](https://github.com/ChromeDevTools/timeline-url)
- [[Repo:Competitor] Trace collection library for GraphQL servers from Apollostack](https://github.com/apollostack/graphql-tracer)
