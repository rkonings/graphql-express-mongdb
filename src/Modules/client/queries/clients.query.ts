import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    query GET_CLIENTS($type: [String], $city: [String]) {
        clients(type: $type, city: $city) {
            ...Client
        }
    }

    ${Client}

`;
