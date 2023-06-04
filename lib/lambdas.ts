import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class MyLambdas extends Construct {
  public readonly helloLambda: NodejsFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.helloLambda = this.createHelloLambda();
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
}
