import React from "react";
import Loader from "../Loader";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {withRouter} from "next/router";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import TransactionFailed from "./components/TransactionFailed";
import TransactionSuccess from "./components/TransactionSuccess";
import TransactionPending from "./components/TransactionPending";

import {SUBSCRIPTION_TRANSACTION_QUERY} from "./queries"

class SubscriptionTransactionPage extends React.PureComponent {
  render(){
    const {data: {loading, error, subscriptionTransaction,refetch}} = this.props;
    if (loading) return <Loader/>;
    // return error page
    if (error) return <h1>ERROR {error.message}</h1>;
    // return 404 page
    if (!subscriptionTransaction) return <h1>No Subscription</h1>
    // return successfull page component
    if (subscriptionTransaction.state === "SUCCESS")
      return <TransactionSuccess transaction={subscriptionTransaction}/>
    // return transaction failed page
    if (subscriptionTransaction.state === "FAILED")
      return <TransactionFailed transaction={subscriptionTransaction}/>
    // return transaction pending page
    return <TransactionPending transaction={subscriptionTransaction} refetch={refetch}/>
  }
}


export default withRouter(
  compose(
    graphql(SUBSCRIPTION_TRANSACTION_QUERY, {
      options: (props) => {
        const {transactionId} = props.router.query;
        return {
          variables: {transactionId}
        }
      }
    })
  )(SubscriptionTransactionPage)
)
