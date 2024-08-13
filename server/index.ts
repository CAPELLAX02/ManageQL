require('dotenv').config();
import express, { Express, Request, Response, NextFunction } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import connectDB from './config/db';

const port = process.env.PORT || 5000;

const app: Express = express();

connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, () => {
  console.log(
    `\n\x1b[40m\x1b[1mServer running in ${process.env.NODE_ENV} on port ${port}\x1b[0m\n`
  );
});
