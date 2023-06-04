import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import * as dotenv from "dotenv";

dotenv.config();

export class MyLambdas extends Construct {
  public readonly helloLambda: NodejsFunction;
  public readonly neo4jLambda: NodejsFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.helloLambda = this.createHelloLambda();
    this.neo4jLambda = this.createNeo4jLambda();
  }

  private createHelloLambda(): NodejsFunction {
    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        EXAMPLE_KEY: "1",
      },
      runtime: Runtime.NODEJS_18_X,
    };

    const helloLambda = new NodejsFunction(this, "helloLambda", {
      entry: join(__dirname, "..", "src", "hello", "index.js"),
      ...nodeJsFunctionProps,
    });

    return helloLambda;
  }

  private createNeo4jLambda(): NodejsFunction {
    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        URI: process.env.NEO4J_URI as string,
        USER: process.env.NEO4J_USER as string,
        PASSWORD: process.env.NEO4J_PASSWORD as string,
      },
      runtime: Runtime.NODEJS_18_X,
    };

    const neo4jLambda = new NodejsFunction(this, "neo4jLambda", {
      entry: join(__dirname, "..", "src", "neo4j", "index.js"),
      ...nodeJsFunctionProps,
    });

    return neo4jLambda;
  }
}
