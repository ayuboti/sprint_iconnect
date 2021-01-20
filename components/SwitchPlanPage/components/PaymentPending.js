import React from 'react'
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import PropTypes from "prop-types";
import {graphql} from 'react-apollo'
import {PLAN_PAYMENT_STATUS_SUBSCRIPTION} from "../queries";
import Link from "next/link";
import Loader from "../../Loader";
import ErrorPage from "../../ErrorPage";

class PaymentPending extends React.PureComponent {

  render() {
    const {data: {error, loading, memberPlanTransaction}} = this.props;
    if (error) return <ErrorPage message={error.message}/>;

    if (loading) {
      return (
        <MDBContainer>
          <h3 className={"my-3"}>Waiting for user to accept payment</h3>
          <Loader/>
        </MDBContainer>
      )
    }
    const {successStatus, reasonFailed} = memberPlanTransaction;

    if (!successStatus)
      return (
        <MDBRow center>
          <MDBCol size={"10"} md={"6"} className={"text-center"}>
            <MDBAnimation type={"bounce"}>
              <MDBAlert color={"danger"} className={"z-depth-1 rounded"}>
                {reasonFailed}
              </MDBAlert>
            </MDBAnimation>
            <MDBBtn onClick={() => this.props.nextStep('login')}>
              <MDBIcon icon={"redo-alt"} className={"mx-2"}/>
              RETRY
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      )
    return (
      <MDBRow center>
        <MDBCol size={"10"} md={"6"}>
          <MDBAnimation type={"bounceIn"}>
            <MDBAlert color={"success"} className={"z-depth-1 rounded text-center"}>
              Received Payment of
              <span className={"font-weight-bold"}> Ksh.{memberPlanTransaction.amount} </span> for
              <span className="font-weight-bold text-uppercase"> {memberPlanTransaction.plan}</span> plan
            </MDBAlert>
          </MDBAnimation>
        </MDBCol>
        <MDBCol size={"12"}/>
        <MDBCol size={"10"} md={"6"} className={"text-center"}>
          <Link href={"/member/account/member-plan"}>
            <a>
              <MDBBtn className={"rounded-pill"}>View Plan</MDBBtn>
            </a>
          </Link>
        </MDBCol>
      </MDBRow>
    )
  }

}

PaymentPending.propTypes = {
  transactionId: PropTypes.string,
  nextStep: PropTypes.func
}
export default graphql(
  PLAN_PAYMENT_STATUS_SUBSCRIPTION, {
    options: (props) => {
      const {transactionId} = props;
      return {
        variables: {transactionId}
      }
    }
  }
)(PaymentPending);
