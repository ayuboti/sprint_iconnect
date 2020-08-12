import React, {PureComponent} from 'react'

import {MDBBtn, MDBCardTitle, MDBCol, MDBIcon} from "mdbreact";
import Link from "next/link";
import Jumbotron from "../../Jumbotron";

class HomeLanding extends PureComponent {

  render() {
    return (
      <Jumbotron>
        <MDBCol className="py-5 py-sm-2 text-center">
          <MDBCardTitle className="h1-responsive pt-1 pt-md-5 m-1 m-md-5 m-lg-5 font-bold">
            Subscribe to your favourite services
          </MDBCardTitle>
          <p className="mx-5 mb-5">
            We help you get rewarded for being a loyal customer by giving the ability to subscribe
            to your local businesses,
          </p>
          <Link href={"/subscriber/login"} as={"/subscriber/login"}>
            <a>
              <MDBBtn color={"white"} className={"rounded-pill"}>
                <MDBIcon icon="dollar" className="mr-2"/>
                Login/ Sign up now
              </MDBBtn>
            </a>
          </Link>
        </MDBCol>
      </Jumbotron>
    )//content to be rendered after page load
  }
}

export default HomeLanding;