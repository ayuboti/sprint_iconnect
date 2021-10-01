import React from "react";
import {MDBAnimation, MDBCol, MDBIcon, MDBRow} from "mdbreact";

export default class FeatureSection extends React.PureComponent {
  render() {
    return (
      <div id={"features"}>
        <div style={{height: "67px"}}/>
        <div className="container pt-3">
          <h1 className="mb-3">Features</h1>
          <section className="p-md-3 mx-md-5">
            <div className={"px-2 mb-4"}>
              <div className={"row d-flex justify-content-between align-items-center z-depth-1 py-3 px-2"}
                   style={{borderRadius: "1rem"}}>
                <div className="col-md-8 mb-4 ">
                  <p className="text-muted pt-3">
                    The subscription pricing model has grown famous over the last few decades as large companies such as
                    Amazon Web Services, Netflix, Spotify all use this model to ensure a consistent flow of revenue.
                    We as M-Subscribe are offering you an opportunity to create consistent revenue streams to your
                    business irrespective of industry or location in the country.
                    We receive payment for you and store them in a sucure wallet where you can withdraw directly to your
                    M-PESA account.
                  </p>
                </div>
                <div className="col-md-4 col-lg-4 d-flex justify-content-center mb-md-0 mb-5">
                  <MDBIcon icon="stopwatch" className={"blue-text"} size={"10x"}/>
                </div>
              </div>
            </div>
            <MDBRow className="pt-3">
              <MDBCol lg={"4"} md={"6"} className="mb-5">
                <MDBAnimation type={"fadeInLeft"} className={'h-100'}>
                  <div className={"z-depth-1-half p-3 h-100"} style={{borderRadius: "1rem"}}>
                    <h4 className="font-weight-lighter mb-3 text-center">
                      <MDBIcon fab icon={"google"} className={"blue-text pr-2 float-left"}/>
                      Google Login
                    </h4>
                    <p className="text-muted mb-lg-0 pl-2">
                      All you need to join is a google account. No registration required.
                    </p>
                  </div>
                </MDBAnimation>
              </MDBCol>
              <MDBCol lg={"4"} md={"6"} className="mb-5">
                <MDBAnimation type={"fadeInUp"} className={'h-100'}>
                  <div className={"z-depth-2 p-3 h-100"} style={{borderRadius: "1rem"}}>
                    <h4 className="font-weight-lighter mb-3 text-center">
                      <MDBIcon icon="shield-alt" className={"blue-text pr-2 float-left"}/>
                      Secure Withdrawal
                    </h4>
                    <p className="text-muted mb-lg-0 pl-2">
                      We ensure that we think of your money's security hence we implemented an OTP(One Time Password)
                      policy on all withdrawals.
                    </p>
                  </div>
                </MDBAnimation>
              </MDBCol>
              <MDBCol lg={"4"} md={"6"} className="mb-5">
                <MDBAnimation type={"fadeInRight"} className={'h-100'}>
                  <div className={"z-depth-1-half p-3 h-100"} style={{borderRadius: "1rem"}}>
                    <h4 className="font-weight-lighter mb-3 text-center">
                      <MDBIcon icon="mobile-alt" className={"blue-text pr-2 float-left"}/>
                      Mobile Withdrawal
                    </h4>
                    <p className="text-muted mb-md-0 pl-2">
                      The app is integrated with M-PESA to allow for money transfer directly to your phone.
                    </p>
                  </div>
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </section>
        </div>
      </div>

    )
  }
}
