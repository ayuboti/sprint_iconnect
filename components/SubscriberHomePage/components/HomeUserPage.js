import React from 'react'
import {MDBBtn, MDBCard, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow} from 'mdbreact'
import Link from "next/link";
import PropTypes from "prop-types";

class HomeUserPage extends React.Component {

  render() {
    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBContainer>
            <MDBRow className={"mt-5"}>
              <MDBCol size={"12"} md={"4"} className={"py-2"}>
                <div className={"view"} style={{borderRadius: "1rem"}}>
                  <MDBCard style={{borderRadius: "1rem"}}>
                    <MDBCardImage zoom src={'/subscriptions.jpg'}
                                  waves
                                  overlay={"black-light"}
                                  style={{
                                    borderTopRightRadius: "1rem",
                                    borderTopLeftRadius: "1rem",
                                    height: "14rem",
                                    width: "100%"
                                  }}/>
                  </MDBCard>
                  <div className={`mask flex-center rgba-blue-light`}>
                    <Link href={'/subscriber/subscriptions'}>
                      <a>
                        <MDBBtn tag={"span"} color={"white"} className={"rounded-pill"}>
                          <MDBIcon icon={"file-contract"} className={"mx-1"}/>
                          My Subscriptions
                        </MDBBtn>
                      </a>
                    </Link>
                  </div>
                </div>
              </MDBCol>
              <MDBCol size={"12"} md={"4"} className={"py-2"}>
                <div className={"view"} style={{borderRadius: "1rem"}}>
                  <MDBCard style={{borderRadius: "1rem"}}>
                    <MDBCardImage zoom src={'/my-account.jpg'}
                                  waves
                                  overlay={"black-light"}
                                  style={{
                                    borderTopRightRadius: "1rem",
                                    borderTopLeftRadius: "1rem",
                                    height: "14rem",
                                    width: "100%"
                                  }}/>
                  </MDBCard>
                  <div className={`mask flex-center rgba-blue-light`}>
                    <Link href={'/subscriber/account'}>
                      <a>
                        <MDBBtn tag={"span"} color={"white"} className={"rounded-pill"}>
                          <MDBIcon far icon={"user"} className={"mx-1"}/>
                          My Account
                        </MDBBtn>
                      </a>
                    </Link>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </>
    )
  };
}

HomeUserPage.PropTypes = {
  user: PropTypes.object.isRequired
}

export default HomeUserPage
