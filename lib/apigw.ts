import { Deployment, LambdaRestApi, Stage } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGatewayProps {
  helloLambda: IFunction;
  neo4jLambda: IFunction;
  neo4jGoLambda: IFunction;
}

export class Apigateways extends Construct {
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);
    const apiGateway = this.createSampleApiGateway(props.helloLambda);
    const neo4jApiGateway = this.createNeo4jApiGateway(props.neo4jLambda);
    const neo4jGoApiGateway = this.createNeo4jGoApiGateway(props.neo4jGoLambda);

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

    // Deployment and Stages for Neo4j Lambda javascript
    const neoDeployment = new Deployment(this, "neoDeployment", {
      api: neo4jApiGateway,
    });
    const neoDevStage = new Stage(this, "neo_dev_stage", {
      deployment: neoDeployment,
      stageName: "dev",
    });

    // Deployment and Stages for Neo4j Go Lambda javascript
    const neoGoDeployment = new Deployment(this, "neoGoDeployment", {
      api: neo4jGoApiGateway,
    });
    const neoGoDevStage = new Stage(this, "neo_go_dev_stage", {
      deployment: neoGoDeployment,
      stageName: "dev",
    });

    // Assign Stages to API Gateways
    apiGateway.deploymentStage = devStage;
    neo4jApiGateway.deploymentStage = neoDevStage;
    neo4jGoApiGateway.deploymentStage = neoGoDevStage;
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

  private createNeo4jGoApiGateway(neo4jGoLambda: IFunction) {
    const apiGateway = new LambdaRestApi(this, "neo4jGoApiGw", {
      handler: neo4jGoLambda,
      proxy: false,
      restApiName: "Neo4j Go Api",
      deploy: false,
    });

    const sampleApi = apiGateway.root.addResource("neo");
    sampleApi.addMethod("GET");
    sampleApi.addMethod("POST");

    return apiGateway;
  }
}
