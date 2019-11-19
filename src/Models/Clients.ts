import mongoose from 'mongoose';
import { Schema, Document} from 'mongoose';

interface ClientModel {
    id: string;
    name: string;
    address: string;
    zipcode: string;
    telephone: string;
    city: string;
    user: string;
}

const clientSchema = new Schema({
    id: String,
    name: String,
    address: String,
    zipcode: String,
    telephone: String,
    city: String,
    user: {type: mongoose.Schema.Types.ObjectId,ref:'User'}
});

const Client = mongoose.model<ClientModel & Document>('Client', clientSchema);

export default Client;