import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import compose from 'lodash.flowright'
import {graphql} from "react-apollo";
import Loader from "../../Loader";
import {INITIATE_SUBSCRIPTION_TRANSACTION} from "../queries";
import IPAYButton from "@bit/makinika.ipay.ipay-button";
import {IPAY_LIVE, IPAY_VENDOR_ID} from "../../../_constants";
import PropTypes from "prop-types";

const IPAY_CALLBACK_ENDPOINT = `/subscriber/transactions/callback`;

class PayForSubscription extends React.PureComponent {
  state = {
    phone: "+254",
    loading: false,
    errors: [],

  }

  getCallBack = () => {
    const {isCreator} = this.props;
    let callback = `${location.origin}${IPAY_CALLBACK_ENDPOINT}`
    if (isCreator)
      return callback + "/test"
    return callback
  }
  getIsLive = () => {
    const {isCreator} = this.props;
    return !isCreator && IPAY_LIVE
  }
  initializeFunction = async () => {
    // get the hash and the transaction id of the ipay transaction
    this.setState({loading: true})
    const {subscriptionId, amount, interval} = this.props;
    const {phone} = this.state;
    let hash, transactionId;

    const updateVars = (newHash, newTransactionId) => {
      hash = newHash;
      transactionId = newTransactionId
    };
    const isLive = this.getIsLive()

    await this.props.initiateSubscriptionTransaction({
        variables: {
          phone: phone.substring(1),
          amount,
          interval,
          subscriptionId,
          callbackUrl: this.getCallBack(),
          live: isLive
        }
      }
    ).then(
      ({data: {initiateSubscriptionTransaction: {errors, transaction, hash, paymentPending}}}) => {
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
  submitHandler = e => {
    e.preventDefault()
  }
  phoneChangeHandler = ({target: {value}}) => {
    if (this.isValidPhone(value)) {
      this.setState({phone: value, errors: []});
      return;
    }
    this.setState({phone: value, errors: ['Invalid Phone Number']});
  }

  isValidPhone = (phone) => {
    const pattern = /^\+254(?:[0-9] ?){8,11}[0-9]$/;
    return Boolean(pattern.test(phone));
  }

  render() {
    const {amount, user} = this.props;
    if (!user) return null;
    const {phone, loading} = this.state;
    let errors = this.state.errors;
    if (!errors.length && !this.isValidPhone(phone))
      errors = errors.concat(['Invalid Phone Number'])

    const inputErrors = errors.map(
      (error, key) => (
        <div key={key} className="invalid-feedback">
          {error}
        </div>
      )
    )
    const invalidClass = errors.length && phone ? "is-invalid" : "";
    const validClass = !errors.length && phone ? "is-valid" : "";


    return (
      <MDBContainer>
        <form onSubmit={this.submitHandler}>
          <MDBRow>
            <MDBCol size={"11"} md={"6"}>
              <h4 className={"text-center"}>Amount: Ksh.{amount}</h4>
            </MDBCol>
            <MDBCol size={"12"}/>
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
                amount={amount}
                email={user.email}
                phoneNumber={phone.substring(1)}
                callbackUrl={this.getCallBack()}
                initializeFunc={this.initializeFunction}
                customComponent={
                  (props) => (
                    <MDBBtn className={"rounded-pill"} type={"submit"}
                            color={"white"}
                            disabled={invalidClass || loading}
                            {...props}>
                      <img alt={"ipay logo"}
                           src={"/images/ipay-logo.png"}
                           height={"30px"}
                           width={"50px"}
                           className={"mx-2 rounded-pill"}/>
                      CONTINUE WITH IPAY <MDBIcon icon={"arrow-right"}/>
                    </MDBBtn>
                  )
                }/>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    )
  }
}

PayForSubscription.propTypes = {
  user: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  isCreator: PropTypes.bool.isRequired,
  interval: PropTypes.string.isRequired,
  subscriptionId: PropTypes.any.isRequired
}
export default compose(
  graphql(INITIATE_SUBSCRIPTION_TRANSACTION, {name: 'initiateSubscriptionTransaction'})
)(PayForSubscription)