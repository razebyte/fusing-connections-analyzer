# N-Network Analysis: Pipeline
This is the configuration for a *Concourse CI* instance that will run the *QoS Data Task*. We are doing this in order to gather data over a period of time.

## How To Use

## Prerequisites
* A Concourse Server
Installation instructions: https://concoursetutorial.com/
The above tutorial will also guide you on how to use the fly CLI.

#### 1) TODO: Fill In
* Download the `pipeline.yml` file in this subdirectory
* Download and fill in the credentials-template.yml
* Run `fly -t <your concourse server target name> sp -p N_Networks_Pipeline -c pipeline.yml -l credentials-template.yml`
