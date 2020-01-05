import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    mutation CREATE_CLIENT($client: ClientInput) {
        createClient(client: $client) {
            ...Client
        }
    }

    ${Client}
`;
