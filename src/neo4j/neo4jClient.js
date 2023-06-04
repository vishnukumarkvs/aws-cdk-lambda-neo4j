import neo4j from "neo4j-driver";

// const uri = process.env.NEO4J_URI;
// const user = process.env.NEO4J_USER;
// const password = process.env.NEO4J_PASSWORD;

export const driver = neo4j.driver(
  process.env.URI,
  neo4j.auth.basic(process.env.USER, process.env.PASSWORD)
);
