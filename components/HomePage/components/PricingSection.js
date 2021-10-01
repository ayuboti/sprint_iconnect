import React from "react";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";

export default class PricingSection extends React.PureComponent {
  render() {
    return (
      <div id={"pricing"}>
        <div style={{height: "67px"}}/>
        <MDBContainer className="my-3">
          <h1 className="mt-4 mb-3">Our Pricing</h1>
          <section className="dark-grey-text p-md-3 mx-md-5">
            <MDBRow>
              <MDBCol size={"12"} className="mb-4">
                <MDBCard className="z-depth-1 bordered border-light">
                  <MDBCardBody className="p-0">
                    <MDBRow className="mx-0">
                      <MDBCol md={"8"} className="rgba-blue-slight rounded-left pt-4">
                        <h3>Free</h3>
                        <p className="font-weight-light text-muted mb-4">
                          With our free plan you get to enjoy all the benefits that come with being an M-Subscribe
                          member.Create unlimited subscriptions and share payment links on social media.
                        </p>
                      </MDBCol>
                      <MDBCol md={"4"} className="text-center pt-4">
                        <p className="h1 font-weight-normal">Ksh.0<small>/month</small></p>
                        <p className="h5 font-weight-light text-muted mb-4">@7% commission </p>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol size={"12"} className="mb-4">
                <MDBCard className="z-depth-2 bordered border-light">
                  <MDBCardBody className="p-0">
                    <MDBRow className="mx-0">
                      <MDBCol md={"8"} className="rgba-blue-slight rounded-left pt-4">
                        <h3>Basic</h3>
                        <p className="font-weight-light text-muted mb-4">
                          With this plan you get access to paybill integration not withstanding the lower
                          commission rates.
                        </p>
                      </MDBCol>
                      <MDBCol md={"4"} className="text-center pt-4">
                        <p className="h1 font-weight-normal">Ksh.500<small>/month</small></p>
                        <p className="h5 font-weight-light text-muted mb-4">@ 5% commission</p>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol size={"12"} className="mb-4">
                <MDBCard className="z-depth-1-half bordered border-light">
                  <MDBCardBody className="p-0">
                    <MDBRow className="mx-0">
                      <MDBCol md={"8"} className="rgba-blue-slight rounded-left pt-4">
                        <h3>Premium</h3>
                        <p className="font-weight-light text-muted mb-4">
                          Enjoy full time support and free social media consultation as we help you gain more
                          customers.
                        </p>
                      </MDBCol>
                      <MDBCol md={"4"} className="text-center pt-4">
                        <p className="h1 font-weight-normal">Ksh.750<small>/month</small></p>
                        <p className="h5 font-weight-light text-muted mb-4">@ 3% commission </p>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>
      </div>
    )
  }
}
