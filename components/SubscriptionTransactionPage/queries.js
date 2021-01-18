import gql from 'graphql-tag';

export const SUBSCRIPTION_TRANSACTION_QUERY = gql`
  query SubscriptionTransaction($transactionId:ID!) {
    subscriptionTransaction(id:$transactionId){
      id
      successStatus
      reasonFailed
      amount
      state
      userSubscription{
        id
        expiryDate
        subscription{
          id
          name
        }
      }
    }
  }`;

  export const PAYMENT_STATUS_SUBSCRIPTION = gql`
    subscription PaymentSubscription($transactionId:ID!){
      subscriptionTransaction(transactionId:$transactionId){
        id
        successStatus
        reasonFailed
        amount
        state
        userSubscription{
          id
          expiryDate
          subscription{
            id
            name
          }
        }
      }
    }
  `;
