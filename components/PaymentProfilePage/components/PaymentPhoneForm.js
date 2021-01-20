import React from "react";
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Link from "next/link";

import {MutationForm} from "../../Form";
import {PAYMENT_PROFILE_MUTATION, PAYMENT_PROFILE_QUERY} from "../queries";
import {Field} from "../../FIeld";
import {format_errors} from "../../../_helpers";

export default class PaymentPhoneForm extends React.PureComponent {
  state = {
    phone: "",
    errors: {},
    alerts: [],
    submitted: false
  }
  getData = () => {
    const {phone} = this.state;
    let {paymentProfile = {}} = this.props;
    if (!paymentProfile) paymentProfile = {};
    return {
      phone: paymentProfile ? phone : paymentProfile.phone
    }
  }
  completeHandler = ({editPaymentProfile: {paymentProfile, errors}}) => {
    if (paymentProfile) {
      this.setState({
        alerts: ["Payment Phone-Number set success.\nCheck your phone for messages from AFRICASTALKING " +
        "and use the code to verify your phone number"]
      })
      return // redirect('/member/account');
    }
    this.setState({errors: format_errors(errors), submitted: true})
  }

  changeHandler = ({target: {value}}) => {
    const pattern = /^0(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/
    if (pattern.test(value)) {
      const finishedPhone = "+254" + value.slice(1)
      this.setState({phone: finishedPhone, errors: {}});
      return
    }
    this.setState({phone: value, errors: {phone: ['Invalid Phone Number']}, submitted: true});
  }
  mutationOptions = {
    refetchQueries: [{query: PAYMENT_PROFILE_QUERY}]
  };

  render() {
    const {paymentProfile,toggle} = this.props;
    const {submitted, errors} = this.state;
    const successAlerts = this.state.alerts.map(
      (message, key) => (
        <MDBAlert color={"success"} key={key} className={"z-depth-1"}>
          {message}
        </MDBAlert>
      )
    )
    if (this.state.alerts.length) {
      return (
        <MDBContainer className={"text-center"}>
          {successAlerts}
          <Link href={'/member/account/payment/verify-phone'}>
            <a>
              <MDBBtn className={"rounded-pill mt-4"} onClick={
                () => {
                  if (toggle) toggle()
                }
              }>
                Verify Phone Number
              </MDBBtn>
            </a>
          </Link>
        </MDBContainer>
      )
    }
    return (
      <>
        <MDBContainer className={"text-center"}>
          <h1>Payment Phone Number</h1>
          <MutationForm
            mutation={PAYMENT_PROFILE_MUTATION}
            data={this.getData()}
            mutationOptions={this.mutationOptions}
            onCompleted={this.completeHandler}>
            <MDBRow center>
              <MDBCol size={"10"} md={"6"}>
                <MDBAnimation type={"bounceIn"}>
                  <MDBAlert color={"danger"} className={"z-depth-1"}>
                    Add Payment Details
                  </MDBAlert>
                  {this.state.alerts.map(
                    (message, key) => (
                      <MDBAlert color={"success"} key={key} className={"z-depth-1"}>
                        {message}
                      </MDBAlert>
                    )
                  )}
                </MDBAnimation>
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"11"}>
                <p className={"text-info mb-0"}>
                  The phone number will be used for withdrawals
                  <br/>
                  Input phone number in format 07########
                </p>
                <Field
                  submitted={submitted}
                  initial={paymentProfile ? paymentProfile.phone : ""}
                  label={"Phone Number"}
                  required
                  showSuccess
                  fieldErrors={errors.phone}
                  onChange={this.changeHandler}
                />
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"6"} className={"text-center"}>
                <MDBBtn type={"submit"} className={"rounded-pill"}>
                  SUBMIT
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MutationForm>
        </MDBContainer>
      </>
    )
  }
}
