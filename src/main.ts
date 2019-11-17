import { ApolloServer } from 'apollo-server';
import { IResolvers } from 'graphql-tools';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';

const server = new ApolloServer({ resolvers: resolvers as IResolvers, typeDefs });

server.listen()
  .then(({ url }) => console.log(`Server ready at ${url}. `));
 
// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => console.log('Module disposed. '));
}
