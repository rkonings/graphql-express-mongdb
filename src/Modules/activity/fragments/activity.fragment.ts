import gql from 'graphql-tag';

export default gql`
  fragment Activity on Activity {
    _id
    title
    notes
    type
    creationDate
    dueDate
  }
`;