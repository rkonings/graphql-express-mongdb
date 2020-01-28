import gql from 'graphql-tag';

export default gql`
  fragment Time on Time {
    _id
    task
    start
    end
    duration
  }
`;