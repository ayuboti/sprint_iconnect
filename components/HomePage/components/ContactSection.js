import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";

export default class ContactSection extends React.PureComponent {
  render() {
    return (
      <div id={"contact-us"} className={"mb-5"}>
        <div style={{height: "67px"}}/>
        <div className={"container pt-2 pb-5"}>
          <h1 className="mt-4 mb-3">Contact Us</h1>
          <section className="px-md-3 mx-md-5 text-center text-lg-left dark-grey-text">
            <MDBRow>
              <MDBCol lg={"5"} md={"12"} className="mb-0 mb-md-0">
                <p className="text-muted">
                  Feel free to call or email us at any time any day we are always ready to answer any questions you
                  may have about the service.
                </p>
                <p>
                  <span className="font-weight-bold mr-2">Email:</span>
                  <a href="mailto:sprinticonnectman@gmail.com">sprinticonnectman@gmail.com</a>
                </p>
                <p>
                  <span className="font-weight-bold mr-2">Phone:</span>
                  <a href="tel:+254729377683">+254729377683</a>
                </p>
              </MDBCol>
              <MDBCol lg={"7"} md={"12"} className="mb-4 mb-md-0 text-center">
                <MDBRow>
                  <MDBCol md={"6"}>
                    <MDBInput label={"First Name"}/>
                  </MDBCol>
                  <MDBCol md={"6"}>
                    <MDBInput label={"Last Name"}/>
                  </MDBCol>
                </MDBRow>
                <MDBInput type={"email"} label={"E-mail"}/>
                <MDBInput label={"Subject"}/>
                <MDBInput type={"textarea"} label={"How we can help ?"}/>
                <MDBBtn className={"rounded-pill"} color={"primary"}>
                  Submit
                  <MDBIcon far icon={"paper-plane"} className={"mx-2"}/>
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </section>
        </div>
      </div>
    )
  }
}
