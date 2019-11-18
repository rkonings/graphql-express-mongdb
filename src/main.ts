import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ContextFunction } from 'apollo-server-core';
import { IResolvers } from 'graphql-tools';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Users from './Models/Users';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';
// import cors from 'cors';

const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3001',
//   credentials: true
// }

// app.use(cors(corsOptions))


const SECRET_KEY = 'secret!';

app.post('/login', express.urlencoded(), async (req, res) => {
  const { email, password } = req.body;
  const theUser = Users.find(user => user.email === email)

  if (!theUser) {
    res.status(404).send({
      success: false,
      message: `Could not find account: ${email}`,
    })
    return
  }

  const match = await bcrypt.compare(password, theUser.password);
  if (!match) {
    //return error to user to let them know the password is incorrect
    res.status(401).send({
      success: false,
      message: 'Incorrect credentials',
    })
    return
  }

  const token = jwt.sign(
    { email: theUser.email, id: theUser.id },
    SECRET_KEY,
  )

  res.send({
    success: true,
    token: token,
  })
});

const context: ContextFunction = ({ req }) => {
  const rawToken = req.headers.authorization || '';
  const token = rawToken.split(' ')[1];
  try {
    return jwt.verify(token, SECRET_KEY) as Object;
  } catch (e) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in',
    )
  }
}

const server = new ApolloServer({
  resolvers: resolvers as IResolvers,
  typeDefs,
  context,
});
 
server.applyMiddleware({app});
const port  = 4000;

app.listen({port},
  () => console.log(`The GraphQL server is running on port ${port}`)
)
 
// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => console.log('Module disposed. '));
}
