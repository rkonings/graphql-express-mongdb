
module.exports = {
  "schema": "./src/schema.graphql",
  "overwrite": true,
  "generates": {
      "./src/@types/graphql-resolvers.ts": {
          "plugins": [
              "typescript",
              "typescript-resolvers",
          ],
      }

  }
};