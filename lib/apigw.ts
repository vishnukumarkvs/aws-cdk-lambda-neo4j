import { Deployment, LambdaRestApi, Stage } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGatewayProps {
  helloLambda: IFunction;
}

export class Apigateways extends Construct {
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);
    const apiGateway = this.createSampleApiGateway(props.helloLambda);

    const deployment = new Deployment(this, "sampleDeployment", {
      api: apiGateway,
    });
    const devStage = new Stage(this, "dev_stage", {
      deployment,
      stageName: "dev",
    });
    const prodStage = new Stage(this, "prod_stage", {
      deployment,
      stageName: "prod",
    });

    // Assign one of the stages to the API

    apiGateway.deploymentStage = devStage;
  }

  private createSampleApiGateway(helloLambda: IFunction) {
    const apiGateway = new LambdaRestApi(this, "sampleApiGw", {
      handler: helloLambda,
      proxy: false,
      restApiName: "Sample Api",
      deploy: false,
    });

    const sampleApi = apiGateway.root.addResource("sample");
    sampleApi.addMethod("GET");

    return apiGateway;
  }
}
