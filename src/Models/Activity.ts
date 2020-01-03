import { Activity } from './../@types/graphql-resolvers';
import mongoose from 'mongoose';
import { Schema, Document} from 'mongoose';

const activitySchema = new Schema({
    id: String,
    title: String,
    notes: String,
    creationDate: { type: Date, default: Date.now },
    type: String,
    user: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    client: {type: mongoose.Schema.Types.ObjectId,ref:'Client'},
    dueDate: Date
});

const Activity = mongoose.model<Activity & Document>('Activity', activitySchema);

export default Activity;
