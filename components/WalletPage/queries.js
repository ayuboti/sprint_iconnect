import gql from "graphql-tag"

export const WALLET_QUERY = gql`
  query WalletQuery{
    wallet{
      id
      balance
      withdrawTransactions{
        id
        amount
        createdAt
        transactionCost
        state       
      }
    },
    paymentProfile{
      id
      phone
      paybillNumber
      paybillNarration
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
