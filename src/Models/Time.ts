import { Time } from './../@types/graphql-resolvers';
import mongoose from 'mongoose';
import { Schema, Document} from 'mongoose';

const activitySchema = new Schema({
    id: String,
    task: String,
    start: Date,
    end: Date,
    duration: Number,
    user: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    client: {type: mongoose.Schema.Types.ObjectId,ref:'Client'},
});

const Time = mongoose.model<Time & Document>('Time', activitySchema);

export default Time;
