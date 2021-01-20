import gql from 'graphql-tag';


export const SUBSCRIPTION_QUERY = gql`
  query Subscription($subscriptionId:ID) {
    subscription(subscriptionId:$subscriptionId){
      id
      name
      description
      price
      subscriberCount
      totalPaid
      transactionsCount
      activeSubscribers{
        id
        name
        email
        expiryDate
      }
      inActiveSubscribers{
        id
        name
        email
        expiryDate
      }
      isOwner
    }
  }`;
