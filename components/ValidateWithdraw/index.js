import React from "react";
import WithdrawOTPForm from "../WalletPage/components/WithdrawOTPForm";
import {graphql} from "react-apollo";
import compose from "lodash.flowright";
import {WITHDRAW_TRANSACTION_QUERY} from "../WalletPage/queries";
import Loader from "../Loader";
import {withRouter} from "next/router";
import {MDBContainer} from "mdbreact";

class ValidateWithdrawPage extends React.PureComponent {
  render() {
    const {data: {loading, error, withdrawTransaction}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <h1>{error.message}</h1>
    return (
      <MDBContainer>
        <WithdrawOTPForm transaction={withdrawTransaction}/>
      </MDBContainer>
    )
  }
}

export default withRouter(
  compose(
    graphql(WITHDRAW_TRANSACTION_QUERY, {
      options: (props) => {
        const {transactionId} = props.router.query;
        return {
          variables: {transactionId}
        }
      }
    })
  )(ValidateWithdrawPage)
)