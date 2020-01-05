import gql from 'graphql-tag';

export default gql`
    query GET_FILTERS($types: [String!]!) {
        filter(types: $types) {
            options {
                label
                value
            }
            id
            label
        }
    }

`;
