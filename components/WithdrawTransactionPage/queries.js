import gql from "graphql-tag";

export const WITHDRAW_TRANSACTION_QUERY = gql`
  query WithdrawTransactionQuery($transactionId:ID!){
    withdrawTransaction(transactionId:$transactionId){
      id
      state
    }
  }
`;

export const WITHDRAW_TRANSACTION_STATUS_QUERY = gql`
  query WithdrawTransactionStatusQuery($transactionId:ID!){
    withdrawTransactionStatus(transactionId:$transactionId){
      id
      state
    }
  }
`;
