import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    query clients($type: [String], $city: [String]) {
        clients(type: $type, city: $city) {
            ...Client
        }
    }

    ${Client}

`;
