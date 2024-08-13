import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IClient extends Document {
    name: string;
    email: string;
    phone: string;
}

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

const clientModel: Model<IClient> = mongoose.model('Client', clientSchema);

export default clientModel;
