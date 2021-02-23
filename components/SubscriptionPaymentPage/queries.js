import gql from "graphql-tag";

export const SUBSCRIPTION_QUERY = gql`
  query PaymentSubscription($subscriptionId:ID!) {
    subscription(subscriptionId:$subscriptionId){
      id
      name
      user{
        id
        email
      }
      price
      dailyPrice
      weeklyPrice
      monthlyPrice
      yearlyPrice
    }
    user{
      id
      firstName
      lastName
      email
      imageUrl
    }  
  }`;

export const INITIATE_SUBSCRIPTION_TRANSACTION = gql`
  mutation InitiateSubscriptionTransaction(
      $amount:Float!,$interval:String!,$phone:String!,
      $subscriptionId:String!,$callbackUrl:String!,$live:Boolean!
    ){
      initiateSubscriptionTransaction(
        amount:$amount,phone:$phone,interval:$interval,
        subscriptionId:$subscriptionId,callbackUrl:$callbackUrl,live:$live
      ){
        paymentPending
        transaction{
          id
        }
        hash
        errors{
          field
          errors
        }
      }
  }
`
