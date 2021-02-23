import gql from "graphql-tag";

export const INITIATE_PLAN_PAYMENT = gql`
  mutation InitiateMemberPlanTransaction(
      $plan:String!,$monthsNo:Int!,$phone:String!,
      $callbackUrl:String!
    ){
    initiateMemberPlanTransaction(
        plan:$plan,phone:$phone,monthsNo:$monthsNo,
        callbackUrl:$callbackUrl
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

export const PLAN_PAYMENT_STATUS_SUBSCRIPTION = gql`
  subscription PaymentSubscription($transactionId:ID!){
    memberPlanTransaction(transactionId:$transactionId){
      id
      successStatus
      reasonFailed
      amount
      user{
        id
        plan {
          name
          monthlyPrice
          commission
          expiryDate
          isActive
        }
      }
    }
  }
`;


export const SWITCH_TO_FREE_MUTATION = gql`
  mutation SwitchToFreeMutation{
    switchToFree{
      successStatus
      user{
        id
        plan {
          name
          monthlyPrice
          commission
          expiryDate
          isActive
        }
        wallet{
          id
          balance
        }
      }
    }
  }
`;

export const SWITCH_PLAN_MUTATION = gql`
  mutation SwitchPlanMutation{
    switchPlan{
      successStatus
      user{
        id
        plan {
          name
          monthlyPrice
          commission
          expiryDate
          isActive
        }
        wallet{
          id
          balance
        }
      }
    }
  }
`;