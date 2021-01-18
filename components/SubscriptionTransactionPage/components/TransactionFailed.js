import React from "react";
import {
  MDBContainer,
  MDBAnimation,
  MDBIcon,
  MDBBtn
} from "mdbreact";
import Link from "next/link";

class TransactionFailed extends React.PureComponent {
  render(){
    const {transaction:{userSubscription:{subscription}}} = this.props;
    return(
      <div>
        <MDBContainer>
          <MDBAnimation type="fadeIn">
            <div className="text-center py-4">
              <h1 className="text-muted">Payment UnSuccessfull</h1>
              <MDBIcon far icon="sad-tear" className=" my-4 text-muted" size="4x" />
              <h4>Sorry the transaction was UnSuccessfull</h4>
              <p>Click the button below to try again </p>
              <Link href="/subscriber/subscriptions/[subscriptionId]/pay"
                    as={`/subscriber/subscriptions/${subscription.id}/pay`}>
                <a>
                  <MDBBtn className="rounded-pill my-5" color="grey">
                    RETRY
                    <MDBIcon icon="redo-alt" className="ml-2"/>
                  </MDBBtn>
                </a>
              </Link>
            </div>
          </MDBAnimation>
        </MDBContainer>
      </div>
    )
  }
}

export default TransactionFailed;
