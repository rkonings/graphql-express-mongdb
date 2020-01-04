import ggl from 'graphql-tag';
import { Activity } from '../fragments';

export default ggl`
    mutation updateActivity($activity: UpdateActivityInput) {
        updateActivity(activity: $activity) {
           ...Activity
        }
    }

    ${Activity}

`;
