import gql from 'graphql-tag';


export const APP_QUERY = gql`
  query App {
    user{
      id
      firstName
      lastName
      email
      imageUrl
    }
    memberProfile{
      id
    }
  }
    `;
