# AWS CDK , Lambda , Neo4j Template

This is an AWS CDK project where I have developed a set of Lambda functions that establish a seamless connection with a Neo4j database. Additionally, I have successfully designed an API Gateway, which effectively integrates with the Lambda functions and offers a convenient REST endpoint for interaction. This powerful combination of technologies ensures efficient and reliable communication with the database, allowing for seamless data retrieval and manipulation through the RESTful interface.

I have created 3 lambda functions
- hello : simple function which just return 200 OK
- neo4j : function written in js which connects to your neo4j database and executes a cypher query 
- neo4jgo: function written in golang which does the same thing

## Prerequisites
- Take .env.example as reference and create your .env file in project root. Add your neo4j database credentials in the file.
- Before running cdk commands, you need to run docker in background.

## Project Structure

- lib folder contains cdk stacks which creates resources in AWS
- src folder contains your lambda functions

```
- lib
  - apigw.ts                  
  - lambdas.ts               
  - ts-api-lambda-js-stack.ts
- src
  - hello
  - neo4j
  - neo4jgo
  ```

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
