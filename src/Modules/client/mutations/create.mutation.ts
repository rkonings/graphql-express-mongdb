import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    mutation CreateClient($client: ClientInput) {
        addClient(client: $client) {
            ...Client
        }
    }

    ${Client}
`;
