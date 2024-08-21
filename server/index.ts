require('dotenv').config();
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import connectDB from './config/db';

const port = process.env.PORT || 5000;

/**
 * Initializes the Express backend application
 */
const app: Express = express();

/**
 * Establishes a connection to the MongoDB database.
 * It is called immediately to connect to the database.
 */
connectDB();

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 * Allows the API to accept requests from different origins.
 */
app.use(cors());

/**
 * GraphQL middleware configuration.
 * Sets up the '/graphql' endpoint for GraphQL queries and mutations.
 * The GraphiQL interface is enabled in development mode.
 */
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
    })
);

/**
 * A test route available only in development mode.
 * This route is used to verify if the API is running.
 *
 * @route GET /test
 * @returns {string} A simple test response message
 */
if (process.env.NODE_ENV === 'development') {
    app.get('/test', (req: Request, res: Response) => {
        res.json({
            success: true,
            message: 'API is running',
        });
    });
}

/**
 * Starts the Express server on the specified port.
 * Logs the server status to the console, including the environment mode.
 */
app.listen(port, () => {
    console.log(
        `\n\x1b[40m\x1b[1mServer running in ${process.env.NODE_ENV} on port ${port}\x1b[0m\n`
    );
});
