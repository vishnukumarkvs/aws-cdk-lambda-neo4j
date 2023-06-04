import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyLambdas } from "./lambdas";
import { Apigateways } from "./apigw";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TsApiLambdaJsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myLambdas = new MyLambdas(this, "MyLambdas");

    const apigws = new Apigateways(this, "Apigateways", {
      helloLambda: myLambdas.helloLambda,
      neo4jLambda: myLambdas.neo4jLambda,
      neo4jGoLambda: myLambdas.neo4jGoLambda,
    });
  }
}
