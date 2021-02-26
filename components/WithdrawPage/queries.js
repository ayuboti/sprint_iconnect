import gql from "graphql-tag";
export const WITHDRAW_QUERY = gql`
  query WithdrawQuery{
    wallet{
      id
      balance
    },
    paymentProfile{
      id
      phone
      paybillNumber
      paybillNarration
      tillNumber
      bankCode
      bankAccount
      bankNarration
    }
    memberProfile{
      id
      phone
      phoneVerified
    }
  }
`;

export const PAYBILL_WITHDRAW_MUTATION = gql`
  mutation WithdrawPaybillMutation($amount:Float!,$paybillNumber:String!,$paybillNarration:String!) {
    withdrawPaybill(amount:$amount,paybillNumber:$paybillNumber,paybillNarration:$paybillNarration){
      transaction{
        id
        state
      }
      errors{
        field
        errors
      }
    }
  }
`;

export const TILL_WITHDRAW_MUTATION = gql`
  mutation WithdrawTillMutation($amount:Float!,$tillNumber:String!) {
    withdrawTill(amount:$amount,tillNumber:$tillNumber){
      transaction{
        id
        state
      }
      errors{
        field
        errors
      }
    }
  }
`;
export const WITHDRAW_PHONE_MUTATION = gql`
  mutation WithdrawPhoneMutation($amount:Float!) {
    withdrawPhone(amount:$amount){
      transaction{
        id
        state
      }
      errors{
        field
        errors
      }
    }
  }
`
