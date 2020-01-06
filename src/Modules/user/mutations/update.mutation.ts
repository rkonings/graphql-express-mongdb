import gql from 'graphql-tag';
import { User } from '../fragments';

export default gql`
    mutation UPDATE_USER($user: InputUser) {
        updateUser(user: $user) {
            ...User
        }
    }

    ${User}

`;
