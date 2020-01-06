import gql from 'graphql-tag';
import { User } from '../fragments';

export default gql`
    mutation update($user: InputUser) {
        updateUser(user: $user) {
            ...User
    }

    ${User}

`;
