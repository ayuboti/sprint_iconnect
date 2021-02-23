import React from "react"
import {MDBBtn} from "mdbreact";

export default props => {
  const {disabled, onClick, loading} = props;
  const loader = loading ? (
      <div className="spinner-border text-primary mx-3" style={{width: "1rem", height: "1rem"}} role="status">
          <span className="sr-only">
            Loading...
          </span>
      </div>
    ) : null;
  return (
    <MDBBtn onClick={onClick} disabled={disabled || loading} size={"lg"} color={"white"}
            style={{
              display: "flex",
              borderRadius: ".75rem",
            }}
            className={"z-depth-1 py-2 text-center mx-auto"}>
      <img alt={"google sign in icon"} src={'/googleIcon.svg'} className={"float-left"}
           style={{width: "70px", height: "70px"}}/>
      <span className={"float-right my-auto mx-2"}>Google {loader}</span>
    </MDBBtn>
  )
}
