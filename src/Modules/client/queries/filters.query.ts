import gql from 'graphql-tag';

export default gql`
    query filters($types: [String!]!) {
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
