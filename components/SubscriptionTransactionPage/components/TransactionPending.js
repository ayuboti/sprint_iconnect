import React from 'react'
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import {graphql} from 'react-apollo'
import {PAYMENT_STATUS_SUBSCRIPTION} from "../queries";
import Link from "next/link";

class TransactionPending extends React.PureComponent {

  render() {
    const {data: {error, loading, subscriptionTransaction},refetch} = this.props;
    if (error) return <h1>{error.message}</h1>;
    if (loading)
      return (
        <MDBContainer>
          <MDBRow center>
            <MDBCol size="12" md="10" className="pt-5">
              <h2 className={" my-3 text-center"}>Waiting for payment confirmation</h2>
              <h5 className={" my-3 text-center"}>
                <MDBIcon className="text-muted text-center" icon="clock" size="2x"/>
              </h5>
              <div>
                <Loader/>
                <h5 className="text-center">
                  <MDBBtn className="rounded-pill text-center" onClick={()=>refetch()}>
                    <MDBIcon icon="sync-alt" />  Reload
                  </MDBBtn>
                </h5>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )
    return null;
  }

}

TransactionPending.propTypes = {
  transaction: PropTypes.object,
  nextStep: PropTypes.func
}

export default graphql(
  PAYMENT_STATUS_SUBSCRIPTION, {
    options: (props) => {
      const {transaction} = props;
      return {
        variables: {transactionId:transaction.id}
      }
    }
  }
)(TransactionPending);
