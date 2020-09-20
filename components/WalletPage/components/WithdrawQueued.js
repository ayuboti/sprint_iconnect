import React from 'react'
import {MDBAlert, MDBAnimation, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import {graphql} from 'react-apollo'
import {WITHDRAW_SUBSCRIPTION} from "../queries";
import compose from "lodash.flowright";

class WithdrawQueued extends React.PureComponent {
  /*
  componentDidMount() {
    const {transactionId} = this.props;
    this.props.data.subscribeToMore({
      document: WITHDRAW_SUBSCRIPTION,
      variables: {transactionId}
    })
  }*/

  render() {
    const {data: {error, loading, withdrawTransaction}} = this.props
    if (error) {
      return <h1>{error.message}</h1>
    }
    if (loading) {
      return (
        <MDBContainer>
          <h3 className={"my-3"}>Processing your Withdraw Request</h3>
          <Loader/>
        </MDBContainer>
      )
    }
    const {successStatus, reasonFailed, amount} = withdrawTransaction;

    if (!successStatus)
      return (
        <MDBRow center>
          <MDBCol size={"10"} md={"6"} className={"text-center"}>
            <MDBAnimation type={"bounce"}>
              <MDBAlert color={"danger"} className={"z-depth-1 rounded"}>
                Subscription Payment Failed
              </MDBAlert>
              {reasonFailed}
            </MDBAnimation>
          </MDBCol>
        </MDBRow>
      )
    return (
      <MDBRow center>
        <MDBCol size={"10"} md={"6"}>
          <MDBAnimation type={"bounce"}>
            <MDBAlert color={"success"} className={"z-depth-1 rounded"}>
              You have successfully withdrawn {amount} shillings
            </MDBAlert>
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
    )
  }

}

WithdrawQueued.propTypes = {
  transactionId: PropTypes.string.isRequired,
}
export default compose(
  graphql(
    WITHDRAW_SUBSCRIPTION, {
      options: (props) => {
        const {transactionId} = props;
        return {
          variables: {transactionId}
        }
      }
    }),
  //graphql(WALLET_QUERY)
)(WithdrawQueued);