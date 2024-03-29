import fs from "fs";
import path from "path";
import NiceBenchmark from "./nice-benchmark";
import schema from "./swapi-schema";
import models from "./swapi-schema/models";
import {
  // execute as graphqlExecute,
  parse,
  experimentalExecuteIncrementally as graphqlExecute,
} from "graphql";

const query = fs.readFileSync(
  path.join(__dirname, "./fixtures/query1.graphql"),
  {
    encoding: "utf-8",
  },
);

const parsedQuery = parse(query);

const queryRunningSuite = new NiceBenchmark("Query Running");
queryRunningSuite.add("graphql-js - string queries", async () => {
  const result = await graphqlExecute({
    schema,
    document: parse(query),
    contextValue: { models },
  });
  if (result.errors || !result.data) {
    throw new Error("Stuff ain't executing");
  }
});
queryRunningSuite.add("graphql-js - parsed queries", async () => {
  const result = await graphqlExecute({
    schema,
    document: parsedQuery,
    contextValue: { models },
  });
  if (result.errors || !result.data) {
    throw new Error("Stuff ain't executing");
  }
});

const queryParsingSuite = new NiceBenchmark("Query parsing");
queryParsingSuite.add("graphql-js", async () => {
  parse(query);
});

async function main() {
  await queryParsingSuite.run();
  await queryRunningSuite.run();
}

main();
