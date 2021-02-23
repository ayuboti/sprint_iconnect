import React from "react"
import {withApollo} from "../../../../apollo";
import {withSubscriberLayout} from "../../../../components/app";
import {MDBBtn, MDBIcon} from "mdbreact";
import Link from "next/link";

class TestCallbackPage extends React.PureComponent {

  render() {
    return (
      <div className={"text-center"}>
        <h1 className={"text-center"}>
          SuccessFull Test Transaction Made
        </h1>
        <Link href={"/subscriber"} >
          <a>
            <MDBBtn className={"rounded-pill text-center"}>
              HOME
              <MDBIcon icon={"home"}/>
            </MDBBtn>
          </a>
        </Link>
      </div>
    );
  }
}

export default withApollo({ssr: false})(
  withSubscriberLayout(TestCallbackPage, {secure: false})
);