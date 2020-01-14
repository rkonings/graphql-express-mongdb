import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    query clients($type: [String], $city: [String], $sort: SortInput) {
        clients(type: $type, city: $city, sort: $sort) {
            ...Client
        }
    }

    ${Client}

`;
