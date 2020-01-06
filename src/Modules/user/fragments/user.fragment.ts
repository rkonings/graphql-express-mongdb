import gql from 'graphql-tag';

export default gql`
    fragment User on User {
        _id
        email
        firstName
        lastName
        settings {
            language
            dateFormat
            pushNotifications
            unscribeEmailLink
            signature
        }

    }
`;
