import { Deployment, LambdaRestApi, Stage } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGatewayProps {
  helloLambda: IFunction;
  neo4jLambda: IFunction;
}

export class Apigateways extends Construct {
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);
    const apiGateway = this.createSampleApiGateway(props.helloLambda);
    const neo4jApiGateway = this.createNeo4jApiGateway(props.neo4jLambda);

    // Deployment and Stages for Sample Hello Lambda
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

    // Deployment and Stages for Neo4j Lambda
    const neoDeployment = new Deployment(this, "neoDeployment", {
      api: neo4jApiGateway,
    });
    const neoDevStage = new Stage(this, "neo_dev_stage", {
      deployment: neoDeployment,
      stageName: "dev",
    });

    // Assign Stages to API Gateways
    apiGateway.deploymentStage = devStage;
    neo4jApiGateway.deploymentStage = neoDevStage;
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

  private createNeo4jApiGateway(neo4jLambda: IFunction) {
    const apiGateway = new LambdaRestApi(this, "neo4jApiGw", {
      handler: neo4jLambda,
      proxy: false,
      restApiName: "Neo4j Api",
      deploy: false,
    });

    const sampleApi = apiGateway.root.addResource("neo");
    sampleApi.addMethod("GET");

    return apiGateway;
  }
}
