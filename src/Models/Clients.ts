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
    type: string;
}

const clientSchema = new Schema({
    id: String,
    name: String,
    address: String,
    zipcode: String,
    telephone: String,
    city: String,
    type: String,
    user: {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    user: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    activities: [{type: mongoose.Schema.Types.ObjectId,ref:'Activity'}]
});

const Client = mongoose.model<ClientModel & Document>('Client', clientSchema);

export default Client;
