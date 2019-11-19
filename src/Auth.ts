import { AuthenticationError } from 'apollo-server-express';
import User from './Models/Users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const auth = async (email: string, password: string, secretKey: string) => {

    const theUser = await User.findOne({email}).exec();

    if (!theUser) {
        throw new AuthenticationError(`Could not find account: ${email}`);
    }

    const match = await bcrypt.compare(password, theUser.password);
    if (!match) {
        throw new AuthenticationError( 'Incorrect credentials');
    }

    const token = jwt.sign(
        {_id: theUser._id, email: theUser.email},
        secretKey,
    )

    return token;
};

export default auth;
