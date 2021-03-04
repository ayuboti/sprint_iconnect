import gql from "graphql-tag";

export const WITHDRAW_TRANSACTION_QUERY = gql`
  query WithdrawTransactionQuery($transactionId:ID!){
    withdrawTransaction(transactionId:$transactionId){
      id
      state
    }
  }
`;
