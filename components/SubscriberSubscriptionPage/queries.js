import gql from 'graphql-tag';


export const USER_SUBSCRIPTION_QUERY = gql`
  query UserSubscription($subscriptionId:ID) {
    subscription(subscriptionId:$subscriptionId){
      id
      name
      description
      price
    }
    userSubscription(subscriptionId:$subscriptionId){
      id
      expiryDate
    }
  }`;
