import gql from 'graphql-tag';
import { Activity } from '../fragments';

export default gql`
    mutation updateActivity($activity: UpdateActivityInput) {
        updateActivity(activity: $activity) {
           ...Activity
        }
    }

    ${Activity}

`;
