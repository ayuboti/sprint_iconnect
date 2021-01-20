import React from "react";
import {MDBBtn, MDBContainer, MDBIcon} from "mdbreact";
import Link from "next/link";
import {withRouter} from "next/router";

class NotFoundPage extends React.PureComponent {

  render() {
    const {router: {asPath, query: {next}}} = this.props;
    let redirectUrl = "/";

    if (asPath.split("/").find(value => value === "member"))
      redirectUrl = "/member";
    else if (asPath.split("/").find(value => value === "subscriber"))
      redirectUrl = "/subscriber";

    return (
      <div className={"f-100"}>
        <MDBContainer className={"text-center my-5"}>
          <h1 className={"py-4"}>404! Page not Found</h1>
          <MDBIcon size={"5x"} className={"text-light-green"} icon={"question"}/>
          <br/>
          <Link href={redirectUrl}>
            <a>
              <MDBBtn className={"rounded-pill py-2"} >
                <MDBIcon icon={"home"}/> HOME
              </MDBBtn>
            </a>
          </Link>
        </MDBContainer>
      </div>
    )
  }
}

export default withRouter(NotFoundPage);
