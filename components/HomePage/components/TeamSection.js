import React from "react";
import {MDBRow} from "mdbreact";

export default class TeamSection extends React.PureComponent {
  render() {
    return (
      <div id={"our-team"} className="pb-5">
        <div style={{height: "67px"}}/>
        <div className="container py-5 my-5">
          <section className="p-md-3 mx-md-5 text-center text-lg-left">
            <h1 className="text-center mx-auto mb-4 pb-2">Our Team</h1>
            <MDBRow center>
              <div className="col-lg-4 mb-4">
                <div className="p-4">
                  <div className="avatar w-100 white d-flex justify-content-center align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/Photos/Avatars/img%20(5).jpg"
                      className="img-fluid rounded-circle z-depth-1"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <h6 className="font-weight-bold pt-2">Ayub Otieno</h6>
                    <p className="text-muted">
                      <small>
                        <i>
                          CEO & Founder, Lead Software Engineer
                        </i>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </MDBRow>
          </section>
        </div>
      </div>
    )
  }
}
