import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    mutation updateClient($client: ClientInput) {
        updateClient(client: $client) {
            ...Client
        }

        ${Client}
    }

`;
