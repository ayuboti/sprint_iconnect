import React from "react";
import {MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import PaymentPhoneForm from "./PaymentPhoneForm";
import PropTypes from "prop-types";

class ChangePaymentPhoneModal extends React.PureComponent {
  render() {
    const {toggle, isOpen, paymentProfile} = this.props;
    return (
      <MDBModal isOpen={isOpen} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Change Payment Phone Number</MDBModalHeader>
        <MDBModalBody>
          <PaymentPhoneForm toggle={toggle} phone={paymentProfile}/>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

ChangePaymentPhoneModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  paymentProfile: PropTypes.object.isRequired
}

export default ChangePaymentPhoneModal;