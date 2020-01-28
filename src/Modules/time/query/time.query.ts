import gql from 'graphql-tag';
import { Time } from '../fragments';

export default gql`
  query Time ($client: String!) {
    time(client: $client) {
      ...Time
    }
  }
  ${Time}
`;