import gql from "graphql-tag"

export const WALLET_QUERY = gql`
  query WalletQuery{
    wallet{
      id
      balance
      transactions{
        id
        amount
        transactionDate
        transactionCost
        state       
      }
    },
    paymentProfile{
      id
      phone
      paybillNumber
      paybillAccount
    }
  }
`;

export const WITHDRAW_MUTATION = gql`
  mutation WithdrawPaybillMutation($amount:Float!) {
    withdrawPaybill(amount:$amount){
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
export const WITHDRAW_CONFIRM_MUTATION = gql`
  mutation ConfirmWithdrawMutation($transactionId:Int!,$otpCode:String!) {
    confirmWithdraw(transactionId:$transactionId,otpCode:$otpCode){
      transaction{
        id
        state
      }
      errors{
        field
        errors
      }
      withdrawQueued
    }
  }
`


export const WITHDRAW_SUBSCRIPTION = gql`
  subscription WithdrawSubscription($transactionId:ID!){
    withdrawTransaction(transactionId:$transactionId){
      id
      successStatus
      reasonFailed
      amount
      wallet{
        id
        balance
        transactions{
          id
          state
        }
      }
    }
  }
`;


export const WITHDRAW_TRANSACTION_QUERY = gql`
  query WithdrawTransaction($transactionId:Int!){
    withdrawTransaction(transactionId:$transactionId){
      id
      amount
    }
  }
`;

export const RESEND_OTP_CODE_MUTATION = gql`
  mutation ResendOtpCode($transactionId:Int!) {
   resendOtpCode(transactionId:$transactionId){
     successStatus
     description
   } 
  }
`;