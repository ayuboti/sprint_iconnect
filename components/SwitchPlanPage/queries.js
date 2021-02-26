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

export const SWITCH_TO_FREE_MUTATION = gql`
  mutation SwitchToFreeMutation{
    switchToFree{
      successStatus
      user{
        id
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
        wallet{
          id
          balance
        }
      }
    }
  }
`;