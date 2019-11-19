import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ContextFunction } from 'apollo-server-core';
import { IResolvers } from 'graphql-tools';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';
// import cors from 'cors';

mongoose.Promise = global.Promise;
const url = 'mongodb+srv://randykonings:ecB8T6MG8Rz1kKLp@cluster0-vfhnx.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));

const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3001',
//   credentials: true
// }

// app.use(cors(corsOptions))


const SECRET_KEY = 'secret!';

const context: ContextFunction = ({ req }) => {
  const rawToken = req.headers.authorization || '';
  const token = rawToken.split(' ')[1];
  try {
    return jwt.verify(token, SECRET_KEY) as object;
  } catch (e) {
    return {};
  }
}

const apolloServer = new ApolloServer({
  resolvers: resolvers as IResolvers,
  typeDefs,
  context,
});
 
apolloServer.applyMiddleware({app});
const port  = 4000;

const server = app.listen({port},
  () => console.log(`The GraphQL server is running on port ${port}`)
)
 
// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      server.close();
      console.log('Module disposed. ')
    });
}
