import gql from 'graphql-tag';
import { User } from '../fragments';

export default gql`
    query USER {
        user {
            ...User
        }
    }

    ${User}
`;