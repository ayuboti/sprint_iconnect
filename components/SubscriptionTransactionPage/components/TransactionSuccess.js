import Confetti from 'react-dom-confetti';
import React from 'react';
import PropTypes from "prop-types";
import {MDBContainer,MDBAnimation,MDBIcon,MDBRow,MDBCol,MDBCard,MDBBtn} from "mdbreact";
import Link from "next/link";

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 500,
  dragFriction: "0.1",
  duration: "8080",
  stagger: 3,
  width: "20px",
  height: "20px",
  perspective: "5000px",
  colors: ["#3f7cacff", "95afbaff", "#bdc4a7ff", "#d5e1a3ff", "#e2f89cff"]
};

class TransactionSuccess extends React.PureComponent {
  state = {
    active: false,
  };
  componentDidMount(prevProps, prevState) {
    if (!this.state.active) {
      //show confetti after 500s
      this.runConfetti = setTimeout(() => {
        this.setState(() => ({active: true}))
      }, 500);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.runConfetti);
  }
  render(){
    const {transaction:{userSubscription:{subscription:{id,name}},amount}} = this.props;
    return(
      <div>
        <MDBContainer>
          <div className="text-center py-4">
            <h1 className="text-muted">Payment Successfull</h1>
            <MDBIcon far icon="grin-beam" className=" my-4 text-muted" size="4x" />
            <Confetti active={this.state.active} config={ config }/>
            <p>We have received and processed your Payment of
            <strong> Ksh.{amount} </strong> to
            <strong className="text-lowercase"> {name}</strong>
            </p>
          </div>
          <MDBRow center>
            <MDBCol size="12" md="6">
              <h1 className="text-center">
                <Link href={"/subscriber/subscriptions/[subscriptionId]"}
                      as={`/subscriber/subscriptions/${id}`}>
                  <MDBBtn className="rounded-pill text-center">
                    <MDBIcon icon="link"/> View Subscription
                  </MDBBtn>
                </Link>
              </h1>
            </MDBCol>
          </MDBRow>>
        </MDBContainer>
      </div>
    )
  }
}


export default TransactionSuccess;
