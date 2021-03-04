import gql from "graphql-tag";
export const WITHDRAW_QUERY = gql`
  query WithdrawQuery{
    wallet{
      id
      balance
    }
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

export const BANK_WITHDRAW_MUTATION = gql`
  mutation WithdrawBankMutation($amount:Float!,$bankCode:String!,$bankAccount:String!,$bankNarration:String!) {
    withdrawBank(amount:$amount,bankCode:$bankCode,bankAccount:$bankAccount,bankNarration:$bankNarration){
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

export const PHONE_WITHDRAW_MUTATION = gql`
  mutation WithdrawPhoneMutation($amount:Float!,$phone:String!) {
    withdrawPhone(amount:$amount,phone:$phone){
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
