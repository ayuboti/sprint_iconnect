import React from "react";
import {MDBContainer} from "mdbreact";

export default class NoSubscibers extends React.PureComponent {

  render() {
    return (
      <MDBContainer className={"text-center z-depth-1 rounded py-4"}>
        <h1 className={"text-center"}>NO Students Found</h1>
        <p>Go to your goole classroom to add students or share your cours registrations link</p>
      </MDBContainer>
    )
  }
}