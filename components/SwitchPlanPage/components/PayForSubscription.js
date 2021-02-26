import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import compose from 'lodash.flowright'
import {graphql} from "react-apollo";
import Loader from "../../Loader";
import {INITIATE_PLAN_PAYMENT} from "../queries";
import IPAYButton from "@bit/makinika.ipay.ipay-button";
import {IPAY_LIVE, IPAY_VENDOR_ID} from "../../../_constants";

const IPAY_CALLBACK_ENDPOINT = `/member/transactions/plan/callback`;

class PayForSubscription extends React.PureComponent {
  state = {
    phone: "+254",
    monthsNo: 1,
    loading: false,
    errors: [],
    transactionId: null
  }
  getIsLive = () => {
    return IPAY_LIVE
  }

  getCallBack = () => {
    return `${location.origin}${IPAY_CALLBACK_ENDPOINT}`
  }
  submitHandler = e => {
    e.preventDefault()
  }
  initializeFunction = async () => {
    // get the hash and the transaction id of the ipay transaction
    const {phone, monthsNo} = this.state;
    const {plan} = this.props;
    let hash, transactionId;
    const updateVars = (newHash, newTransactionId) => {
      hash = newHash;
      transactionId = newTransactionId
    };
    this.setState({loading: true})

    const isLive = this.getIsLive()

    await this.props.initiatePlanPayment({
        variables: {
          phone: phone.substring(1),
          monthsNo: monthsNo,
          plan: plan,
          callbackUrl: this.getCallBack(true),
          live: isLive
        }
      }
    ).then(
      ({data: {initiateMemberPlanTransaction: {errors, transaction, hash, paymentPending}}}) => {
        if (errors) {
          let allErrors = []
          errors.forEach(({errors}) => allErrors.push(...errors));
          this.setState({errors: allErrors, loading: false});
          return
        }
        if (paymentPending) {
          updateVars(hash, transaction.id);
        }
      }
    )
    if (!hash || !transactionId) return;
    return {hash, transactionId};
  }
  phoneChangeHandler = ({target: {value}}) => {
    if (this.isValidPhone(value)) {
      this.setState({phone: value, errors: []});
      return;
    }
    this.setState({phone: value, errors: ['Invalid Phone Number']});
  }
  monthsChangeHandler = ({target: {value}}) => {
    this.setState({monthsNo: value})
  }

  isValidPhone = (phone) => {
    const pattern = /^\+254(?:[0-9] ?){8,11}[0-9]$/;
    return Boolean(pattern.test(phone));
  }

  render() {
    const {phone, loading, monthsNo} = this.state;
    let errors = this.state.errors;
    if (!errors.length) {
      if (!this.isValidPhone(phone))
        errors = errors.concat(['Invalid Phone Number'])
    }
    const {price, user} = this.props;

    const inputErrors = errors.map(
      (error, key) => (
        <div key={key} className="invalid-feedback">
          {error}
        </div>
      )
    )
    const totalAmount = monthsNo * price;
    const invalidClass = errors.length && phone ? "is-invalid" : "";
    const validClass = !errors.length && phone ? "is-valid" : "";

    return (
      <MDBContainer>
        <h1 className={"text-capitalize text-center"}>Pay For {this.props.plan} Membership</h1>

        <form onSubmit={this.submitHandler}>
          <MDBRow center>
            <MDBCol size={"12"} md={"10"}>
              <h4 className={"text-center"}>Amount: Ksh.{totalAmount}</h4>
              <MDBRow center>
                <MDBCol size={"11"} md={"6"}>
                  {loading ? <Loader/> : null}
                  <MDBInput
                    type={"text"}
                    required
                    valueDefault={phone}
                    disabled={loading}
                    label={"Phone number eg +254XXXXXXXXXX"}
                    onChange={this.phoneChangeHandler}
                    className={validClass + " " + invalidClass}>
                    {inputErrors}
                    <div className={"valid-feedback"}>Valid Phone Number!!</div>
                  </MDBInput>
                  <MDBInput
                    type={"number"}
                    required
                    min={"1"}
                    step={"1"}
                    valueDefault={"1"}
                    disabled={loading}
                    label={"Number of Months"}
                    onChange={this.monthsChangeHandler}
                  />
                </MDBCol>
                <MDBCol size={"12"}/>
                <MDBCol size={"11"} md={"6"} className={"text-center"}>
                  <IPAYButton
                    vendorId={IPAY_VENDOR_ID}
                    paymentOptions={{
                      mpesa: true,
                      airtel: true,
                      debitcard: true,
                      creditcard: true,
                      equity: true,
                      mobilebanking: true,
                      pesalink: true,
                      unionpay: true,
                      vooma: true
                    }}
                    live={this.getIsLive()}
                    amount={totalAmount}
                    email={user.email}
                    phoneNumber={phone.substring(1)}
                    callbackUrl={this.getCallBack(true)}
                    initializeFunc={this.initializeFunction}
                    customComponent={
                      (props) => (
                        <MDBBtn className={"rounded-pill"} type={"submit"}
                                color={"white"}
                                disabled={invalidClass}
                                {...props}>
                          <img alt={"ipay logo"}
                               src={"/images/ipay-logo.png"}
                               height={"30px"}
                               width={"50px"}
                               className={"mx-2 rounded-pill"}/>
                          CONTINUE WITH IPAY
                        </MDBBtn>
                      )
                    }/>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    )
  }
}

export default compose(
  graphql(INITIATE_PLAN_PAYMENT, {name: 'initiatePlanPayment'})
)(PayForSubscription)