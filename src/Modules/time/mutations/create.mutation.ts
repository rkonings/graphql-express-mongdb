import gql from 'graphql-tag';
import { Time } from '../fragments';

export default gql`
    mutation createTime($time: TimeInput!) {
        time(time: $time) {
            ...Time
        }
    }
  ${Time}
`;


