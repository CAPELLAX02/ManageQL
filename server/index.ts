require('dotenv').config();
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`);
});
