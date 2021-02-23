import gql from "graphql-tag";

export const USER_SUBSCRIPTIONS_QUERY = gql`
  query UserSubscriptions {
    user {
      id
      userSubscriptions{
        id
        expiryDate
        subscription{
          id
          name
          description
        }
      }
    }
  }`;
