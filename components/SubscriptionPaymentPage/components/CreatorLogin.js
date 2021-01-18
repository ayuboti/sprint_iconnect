import React from "react";
import LoginForm from "../../LoginPage/components/LoginForm";
import {MDBIcon,MDBContainer} from "mdbreact";
import {GOOGLE_CONFIG} from "../../../_constants";
import {withRouter} from "next/router";

class  CreatorLogin extends React.PureComponent {
  render(){
    const {subscriptionId} = this.props.router.query;
    return (
      <MDBContainer className="text-center">
        <h1>Operation Not Allowed</h1>
        <h5 className={" my-3 text-center"}>
          <MDBIcon className="text-muted text-center" icon="ban" size="2x"/>
        </h5>
        <h5 className="text-muted">You are not allowed to pay your own subscription.</h5>
        <p>
          <br/>
          <strong>Login using another google account</strong>
        </p>
        <LoginForm scope={GOOGLE_CONFIG.scope} redirectUrl={`/subscriber/subscriptions/${subscriptionId}/pay`}/>
      </MDBContainer>
    )
  }
}

export default withRouter(CreatorLogin)
