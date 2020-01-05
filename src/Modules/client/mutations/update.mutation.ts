import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    mutation UPDATE_CLIENT($client: ClientInput) {
        updateClient(client: $client) {
            ...Client
        }

        ${Client}
    }

`;
