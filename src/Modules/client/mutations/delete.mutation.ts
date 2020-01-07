import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    mutation DeleteClient($_id: String!) {
        deleteClient(_id: $_id) {
            ...Client
        }
    }

    ${Client}

`;
