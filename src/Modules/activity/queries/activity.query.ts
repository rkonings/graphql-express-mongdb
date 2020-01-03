import gql from 'graphql-tag';
import { Activity } from '../fragments';

export default gql`
  query Activity {
    activity {
      ...Activity
    }
  }
  ${Activity}
`;