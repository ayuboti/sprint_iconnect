import React from "react";
import PropTypes from "prop-types";
import PaybillForm from "./PaybillForm";
import TillNumberForm from "./TillNumberForm";
import BankPesaLinkForm from "./BankForm";
import MobileForm from "./MobileForm";

export default class PaymentDetailsSection extends React.PureComponent {

  render() {
    const {
      channel,
      amount,
      paymentProfile: {
        paybillNumber,
        paybillNarration,
        phone,
      }
    } = this.props;
    if (channel === "paybill")
      return (
        <PaybillForm
          amount={amount}
          paybillNumber={paybillNumber}
          paybillNarration={paybillNarration}/>
      )
    if (channel === "till")
      return <TillNumberForm amount={amount}/>
    if (channel === "bank")
      return <BankPesaLinkForm amount={amount}/>
    if (channel === "phone")
      return <MobileForm amount={amount}/>
    return null
  }
}

PaymentDetailsSection.propTypes = {
  channel: PropTypes.string.isRequired,
  amount: PropTypes.any.isRequired,
  paymentProfile: PropTypes.object
}