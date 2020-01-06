import gql from 'graphql-tag';
import { User } from '../fragments';

export default gql`
    query User {
        user {
            ...User
        }
    }

    ${User}
`;