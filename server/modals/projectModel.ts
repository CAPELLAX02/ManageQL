import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
    name: string;
    description: string;
    status: string;
    clientId: mongoose.Schema.Types.ObjectId;
}

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

const projectModel: Model<IProject> = mongoose.model('Project', projectSchema);

export default projectModel;
