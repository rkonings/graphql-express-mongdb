import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';


interface UserModel {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: String,
  password: String
});

const User = mongoose.model<UserModel & Document>('User', userSchema); 

// const users = [
//     {
//       id: 1,
//       name: 'Randy Konings',
//       email: 'randy@randykonings.nl',
//       password: '$2b$10$ahs7h0hNH8ffAVg6PwgovO3AVzn1izNFHn.su9gcJnUWUzb2Rcb2W' //ssseeeecrreeet
//     }
// ];

export default User;