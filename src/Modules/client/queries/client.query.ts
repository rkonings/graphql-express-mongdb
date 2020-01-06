import gql from 'graphql-tag';
import { Client } from '../fragments';
import { Activity } from '../../activity/fragments';

export default gql`
    query client($_id: String) {
        client(_id: $_id) {
            ...Client
            activities {
                ...Activity
            }
        }
    }
    ${Activity}
    ${Client}

`;