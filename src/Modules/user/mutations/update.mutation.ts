import gql from 'graphql-tag';
import { User } from '../fragments';

export default gql`
    mutation updateUser($user: InputUser) {
        updateUser(user: $user) {
            ...User
        }
    }

    ${User}

`;
