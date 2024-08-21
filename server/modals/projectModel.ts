import mongoose, { Document, Model, Schema } from 'mongoose';

/**
 * Interface representing a project document in MongoDB.
 * Extends the Mongoose Document interface to include the project's properties.
 *
 * @interface IProject
 * @extends {Document}
 */
export interface IProject extends Document {
    name: string;
    description: string;
    status: string;
    clientId: mongoose.Schema.Types.ObjectId;
}

/**
 * Mongoose schema for the Project model.
 * Defines the structure of the project documents in the MongoDB collection.
 *
 * @type {Schema<IProject>}
 */
const projectSchema: Schema<IProject> = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
});

/**
 * Mongoose model for the Project schema.
 * Provides an interface for interacting with the Project collection in MongoDB.
 *
 * @type {Model<IProject>}
 */
const projectModel: Model<IProject> = mongoose.model('Project', projectSchema);

export default projectModel;
