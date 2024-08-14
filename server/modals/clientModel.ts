import mongoose, { Document, Model, Schema } from 'mongoose';

/**
 * Interface representing a client document in MongoDB.
 * Extends the Mongoose Document interface to include the client's properties.
 *
 * @interface IClient
 * @extends {Document}
 */
export interface IClient extends Document {
    name: string;
    email: string;
    phone: string;
}

/**
 * Mongoose schema for the Client model.
 * Defines the structure of the client documents in the MongoDB collection.
 *
 * @type {Schema<IClient>}
 */
const clientSchema: Schema<IClient> = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

/**
 * Mongoose model for the Client schema.
 * Provides an interface for interacting with the Client collection in MongoDB.
 *
 * @type {Model<IClient>}
 */
const clientModel: Model<IClient> = mongoose.model('Client', clientSchema);

export default clientModel;
