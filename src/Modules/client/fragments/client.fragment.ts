import gql from 'graphql-tag';
export default gql`
    fragment Client on Client {
        _id
        name
        telephone
        address
        city
        zipcode
        type
    }

`;
