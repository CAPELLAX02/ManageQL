import mongoose from 'mongoose';

const mongo_uri: string = process.env.MONGO_URI || '';

/**
 * @async @function
 * Asynchronously connects to the MongoDB database using the Mongoose library.
 * @returns {Promise<void>} A promise that resolves when the connection is successful, or exits the process on failure.
 */
const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(mongo_uri);
        console.log(
            `\x1b[42m\x1b[40mMongoDB connected: ${conn.connection.host}\x1b[0m`
        );
    } catch (error: any) {
        console.log(`\x1b[31mMongoDB connection failed. [${error}]\x1b[0m\n`);
        process.exit(1);
    }
};

export default connectDB;
