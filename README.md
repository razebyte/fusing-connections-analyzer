# Fusing Connections Analyzer: *N-Network Analysis Tool*
This repository houses an analysis tool that has been built to gather data for a prototypical network where source connections have been fused.

## Overview
This project is split into three components that work conjointly to collect the data and to make sense of it
### `Task`
This is a `node.js` application that utilizes `dispatch-proxy` to "fuse" connections running on your machine to execute a "Quality of Service Metric Data Gathering Task", or *task* for short. In our case our task will comprise of retrieving latency and throughput data from a publicly accessible file over HTTP.
### `Pipeline`
This is the configuration required to run a **Concourse CI** instance. This is required to run the Task described above over a period of time and to ultimately collect all the data.
### `UI`
This is a *dashboard* where we collect the results that the Pipeline has collected of Task over a period of time and allow for a human readable representation of the data.

## Credits
* This project has been completed for the University of Western Ontario's **CS 4457: Networks 2** class.
* This project uses [Alexandre Kirszenberg's ](https://github.com/alexkirsz) `node.js` [dispatch-proxy](https://github.com/alexkirsz/dispatch-proxy) tool
## Contributors
* [Yusra Al-Sharafi](https://github.com/SraYusra)
* [Hussein Fahmy](https://github.com/husseinfahmy)
* [Mohammed Khan](https://github.com/razebyte)
* [Connor MacLaren](https://github.com/ConMacL)
* [Gustavo Andres Murcia](https://github.com/GAUNSD)
* [Lina Radwan](https://github.com/linaradwan)
