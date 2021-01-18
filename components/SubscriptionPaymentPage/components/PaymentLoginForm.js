import React from "react";
import LoginForm from "../../LoginPage/components/LoginForm";
import PropTypes from "prop-types";
import {MDBBtn, MDBContainer, MDBIcon} from "mdbreact";

const scope =
  'openid ' +
  'https://www.googleapis.com/auth/userinfo.profile ' +
  'https://www.googleapis.com/auth/userinfo.email ';

export default class PaymentLoginForm extends React.PureComponent {
  clickHandler = () => {
    this.props.nextStep('amount')
  }

  render() {
    // check if user is authenticated then allow the form
    const {subscription: {id, user}} = this.props;

    if (!this.props.user){
      return (
        <MDBContainer>
          <h5 className="text-muted">Please login to your google account to continue</h5>
          <LoginForm scope={scope} redirectUrl={`/subscriber/subscriptions/${id}/pay`}/>
        </MDBContainer>
      )
    }
    const {firstName, lastName} = this.props.user

    return (
      <MDBContainer className={"text-center py-5"}>
        <MDBBtn onClick={this.clickHandler} size={"lg"} color={"white"}>
          Continue as {`${firstName} ${lastName}`}
          <MDBIcon className={"ml-3"} icon={"arrow-right"}/>
        </MDBBtn>
      </MDBContainer>
    )
  }
}

PaymentLoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  subscription: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired
}
