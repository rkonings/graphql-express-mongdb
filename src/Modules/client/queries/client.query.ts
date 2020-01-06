import gql from 'graphql-tag';
import { Client } from '../fragments';

export default gql`
    query client($_id: String) {
        client(_id: $_id) {
            ...Client
        }
    }
    ${Client}

`;