
module.exports = {
    "schema": "./src/schema.graphql",
  "overwrite": true,
  "generates": {
      "./src/@types/graphql-resolvers.ts": {
          "plugins": [
              "typescript",
              "typescript-resolvers",
          ],
      },
      "./src/hooks.tsx": {
        "documents": "./src/Modules/*/*/*.ts",
        "plugins": [
            "typescript",
            "typescript-operations",
            "typescript-react-apollo",
        ],
        "config": {
            withHOC: false,
            withHooks: true,
            withComponent: false,
        }
    }

  }
};