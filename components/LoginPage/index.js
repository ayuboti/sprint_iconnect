import React, {PureComponent} from "react";
import {NextSeo} from "next-seo"
import LoginForm from "./components/LoginForm";
import {withRouter} from "next/router";
import {MDBContainer} from "mdbreact";

class LoginPage extends PureComponent {

  render() {
    const {router: {pathname, query: {next}}} = this.props;
    let redirectUrl, heading;
    if (next) redirectUrl = next;

    if (pathname.split("/").find(value => value === "member")) {
      redirectUrl = redirectUrl ? redirectUrl : "/member";
      heading = "Member"
    } else if (pathname.split("/").find(value => value === "subscriber")) {
      redirectUrl = redirectUrl ? redirectUrl : "/subscriber"
      heading = "Subscriber"
    }
    return (
      <MDBContainer>
        <NextSeo
          title={`${heading} Login`}
          description={"Login to your m subscriber account no in one click all "+
                       "you need is a google account"}
        />
        <LoginForm redirectUrl={redirectUrl}/>
      </MDBContainer>
    )
  }
}

export default withRouter(LoginPage)
