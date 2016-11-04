# graphql-perf
Gather performance information from GraphQL `resolve` methods and prepare JSON in Trace Event Format for Chrome Devtools Timeline tab.

### Plans
Planned to start development at the end of November 2016

### Useful links
- [RFC: Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/edit#heading=h.yr4qxyxotyw)
- [Article: In-depth: Using Chrome://tracing to view your inline profiling data](http://www.gamasutra.com/view/news/176420/Indepth_Using_Chrometracing_to_view_your_inline_profiling_data.php)
- [Repo: Chrome devtools extension to generate a URL for your timeline](https://github.com/ChromeDevTools/timeline-url)

### How it should work under the hood
This package should traverse by types and fields (of provided GraphQL Schema instance) wraps all resolvers and return new wrapped Schema. After that provide wrapped schema to `express-graphql` with defining `exstensions` method which returns trace information from executed request.
