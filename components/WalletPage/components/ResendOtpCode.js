import React from "react";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {RESEND_OTP_CODE_MUTATION} from "../queries";
import PropTypes from "prop-types";
import {MDBAlert, MDBAnimation, MDBBtn, MDBIcon} from "mdbreact";

class ResendOtpCode extends React.PureComponent {
  state = {
    successAlerts: [],
    failAlerts: []
  }
  resendOtpCode = () => {
    this.props.resendOtpCode({
      variables: {
        transactionId: parseInt(this.props.transaction.id),
      }
    }).then(
      ({data: {resendOtpCode: {successStatus, description}}}) => {
        if (successStatus) {
          this.setState({
            failAlerts: [],
            successAlerts: ["Successfully resent message"]
          })
        } else {
          this.setState({
            failAlerts: [description],
            successAlerts: []
          })
        }
      }
    )
  }

  render() {

    return (
      <>
        {this.state.successAlerts.map(
          (message, key) => (
            <MDBAnimation key={key} type={"fadeInDown"}>
              <MDBAlert color={"success"}>{message}</MDBAlert>
            </MDBAnimation>
          )
        )}
        {this.state.failAlerts.map(
          (message, key) => (
            <MDBAnimation key={key} type={"bounceIn"}>
              <MDBAlert color={"danger"}>{message}</MDBAlert>
            </MDBAnimation>
          )
        )}
        <MDBBtn className={"rounded-pill my-3"} onClick={this.resendOtpCode}>
          RESEND OTP
          <MDBIcon icon={"redo-alt"} className={"mx-2"}/>
        </MDBBtn>
      </>
    )
  }
}


ResendOtpCode.propTypes = {
  transaction: PropTypes.object.isRequired
};

export default compose(
  graphql(RESEND_OTP_CODE_MUTATION, {name: 'resendOtpCode'})
)(ResendOtpCode);