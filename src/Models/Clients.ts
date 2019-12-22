import mongoose from 'mongoose';

import { Schema, Document} from 'mongoose';
import { Client } from '../@types/graphql-resolvers';

const clientSchema = new Schema({
    id: String,
    name: String,
    address: String,
    zipcode: String,
    telephone: String,
    city: String,
    type: String,
    user: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    activities: [{type: mongoose.Schema.Types.ObjectId,ref:'Activity'}]
});

const Client = mongoose.model<Client & Document>('Client', clientSchema);

export default Client;
