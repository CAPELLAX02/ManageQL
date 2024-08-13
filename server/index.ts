require('dotenv').config();
import express, { Express, Request, Response, NextFunction } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';

const port = process.env.PORT || 5000;

const app: Express = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`);
});
