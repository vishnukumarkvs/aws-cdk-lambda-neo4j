exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Successfully finished operation: "${event.httpMethod}"`,
    }),
  };
};
