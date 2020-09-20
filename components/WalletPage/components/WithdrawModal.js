import React from "react";
import {MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import PropTypes from "prop-types";
import WithdrawSection from "./WithdrawSection";

class WithdrawModal extends React.PureComponent {
  state = {
    validated:false,
  }
  render() {
    const {toggle, isOpen, balance, paymentProfile} = this.props;
    return (
      <MDBModal isOpen={isOpen} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Withdraw</MDBModalHeader>
        <MDBModalBody>
          <WithdrawSection balance={balance} paymentProfile={paymentProfile}/>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

WithdrawModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  balance: PropTypes.number.isRequired,
  paymentProfile: PropTypes.object.isRequired
}
export default WithdrawModal