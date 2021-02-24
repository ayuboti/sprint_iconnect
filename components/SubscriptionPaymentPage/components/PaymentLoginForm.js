import React from "react";
import LoginForm from "../../LoginPage/components/LoginForm";
import PropTypes from "prop-types";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";

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
    const {user, subscription: {id}} = this.props;
    if (!user) {
      return (
        <MDBContainer>
          <LoginForm scope={scope} redirectUrl={`/subscriber/subscriptions/${id}/pay`}/>
        </MDBContainer>
      )
    }
    const {firstName, lastName, imageUrl} = this.props.user

    return (
      <MDBContainer className={"text-center py-5"}>
        <MDBRow center className={"w-100"}>
          <MDBCol size={"12"} md={"5"}>
            <h4>Continue as ...</h4>
            <MDBBtn onClick={this.clickHandler} size={"lg"} color={"white"}
                    style={{
                      display: "flex",
                      borderRadius: ".75rem",
                    }}
                    className={"z-depth-1 py-2 text-center mx-auto"}>
              <img alt={"user google picture "}
                   src={imageUrl}
                   className={"float-left rounded-circle"}
                   style={{width: "70px", height: "70px"}}/>
              <span className={"float-right my-auto mx-2"}>{`${firstName} ${lastName}`} </span>
            </MDBBtn>
          </MDBCol>
          <MDBCol size={"12"} md={"2"}>
            <h3>or</h3>
          </MDBCol>
          <MDBCol size={"12"} md={"5"}>
            <h4>Sign in with ...</h4>
            <LoginForm buttonOnly scope={scope} redirectUrl={`/subscriber/subscriptions/${id}/pay`}/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

PaymentLoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  subscription: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired
}
