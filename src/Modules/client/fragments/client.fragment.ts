import gql from 'graphql-tag';
import { Activity } from '../../activity/fragments';
export default gql`
    fragment Client on Client {
        _id
        name
        telephone
        address
        city
        zipcode
        type
        activities {
            ...Activity
    }

    ${Activity}
`;
