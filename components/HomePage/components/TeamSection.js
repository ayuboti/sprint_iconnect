import React from "react";
import {MDBRow} from "mdbreact";

export default class TeamSection extends React.PureComponent {
  render() {
    return (
      <div id={"our-team"} className="pb-5">
        <div style={{height: "67px"}}/>
        <div className="container py-5 my-5">
          <section className="p-md-3 mx-md-5 text-center text-lg-left">
            <h2 className="text-center mx-auto font-weight-bold mb-4 pb-2">Our Team</h2>
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
                    <h6 className="font-weight-bold pt-2">Daniel Waruo King'ang'ai</h6>
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