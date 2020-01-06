import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    mutation CREATE_CLIENT($client: ClientInput) {
        addClient(client: $client) {
            ...Client
        }
    }

    ${Client}
`;
