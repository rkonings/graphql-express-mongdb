import gql from 'graphql-tag';
import { Activity } from '../fragments';

export default gql`
    mutation createActivity($activity: CreateActivityInput) {
        addActivity(activity: $activity) {
            ...Activity
        }
    }
  ${Activity}
`;


