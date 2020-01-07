import { User } from './../@types/graphql-resolvers';
import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';


interface UserModel {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  settings?: {
    language: string;
    dateFormat: string;
    pushNotifications: boolean;
    unscribeEmailLink: boolean;
    signature: string;
  }
  
}

const userSchema = new Schema({
  id: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  settings: {
    language: String,
    dateFormat: String,
    pushNotifications: Boolean,
    unscribeEmailLink: Boolean,
    signature: String
  }
  
});

const User = mongoose.model<User & Document>('User', userSchema); 

// const users = [
//     {
//       id: 1,
//       name: 'Randy Konings',
//       email: 'randy@randykonings.nl',
//       password: '$2b$10$ahs7h0hNH8ffAVg6PwgovO3AVzn1izNFHn.su9gcJnUWUzb2Rcb2W' //ssseeeecrreeet
//     }
// ];

export default User;