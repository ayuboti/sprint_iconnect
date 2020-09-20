import React from "react";
import {MDBBtn, MDBCol, MDBRow} from "mdbreact";
import PropTypes from "prop-types";
import {PaybillWithdrawForm} from "./PaybillWithdrawForm";
import {MobileWithdrawForm} from "./MobileWithdrawForm";
import {WITHDRAW_MUTATION, WITHDRAW_PHONE_MUTATION} from "../queries";
import Link from "next/link";

class WithdrawSection extends React.PureComponent {

  render() {
    const {balance, paymentProfile, paymentProfile: {phone, paybillAccount, paybillNumber}} = this.props;
    return (
      <MDBRow>
        {
          paybillAccount ?
            <MDBCol>
              <p>Transfer your money to your M-PESA paybill account</p>
              <p className={"text-bold"}> BUSINESS NUMBER : {paybillNumber}</p>
              <p className={"text-bold"}> ACCOUNT : {paybillAccount}</p>
              <PaybillWithdrawForm balance={balance} paymentProfile={paymentProfile} mutation={WITHDRAW_MUTATION}/>
            </MDBCol> : null
        }
        <MDBCol>
          <p>Transfer your money to your M-PESA phonenumber <b>{phone}</b></p>
          <Link href={"/member/account/payment"}>
            <a>
              <MDBBtn outline className={"rounded-pill"}>
                Change Phone NUmber
              </MDBBtn>
            </a>
          </Link>
          <MobileWithdrawForm balance={balance} paymentProfile={paymentProfile} mutation={WITHDRAW_PHONE_MUTATION}/>
        </MDBCol>
      </MDBRow>
    );
  }
}

WithdrawSection.propTypes = {
  balance: PropTypes.number.isRequired,
  paymentProfile: PropTypes.object.isRequired
}
export default WithdrawSection