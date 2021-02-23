import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import IPAYButton from "@bit/makinika.ipay.ipay-button"
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {INITIATE_SUBSCRIPTION_TRANSACTION} from "../queries"
import {IPAY_VENDOR_ID} from "../../../_constants"
const IPAY_CALLBACK_ENDPOINT = `/subscriber/transactions/callback`;


export const PaymentMethodBtn = props => {
  const {disabled, onClick, loading, method, logoSrc, ...extraProps} = props;
  const loader = loading ? (
    <div className="spinner-border text-primary mx-3" style={{width: "1rem", height: "1rem"}} role="status">
          <span className="sr-only">
            Loading...
          </span>
    </div>
  ) : null;
  return (
    <div className={"text-center px-auto w-100"}>
      <MDBBtn onClick={onClick} disabled={disabled || loading} size={"lg"} color={"white"}
              style={{
                display: "flex",
                borderRadius: ".75rem"
              }}
              className={"z-depth-1 py-2 mx-auto"}
              {...extraProps}>
        <img alt={`${method} icon`} src={logoSrc} className={"float-left"}
             style={{width: "100px", height: "70px"}}/>
        <span className={"float-right my-auto mx-2"}>{loader}</span>
      </MDBBtn>
    </div>
  )
}

class PaymentMethodSection extends React.PureComponent {
  state = {
    loading: false
  }
  getCallBack = (live = false) => {
    let callback = `${location.origin}${IPAY_CALLBACK_ENDPOINT}`
    if (!live)
      return callback + "/test"
    return callback
  }
  getIsLive = () => {
    const {isCreator} = this.props;
    return !isCreator
  }
  initializeFunction = async () => {
    // get the hash and the transaction id of the ipay transaction
    const {subscription: {id}, amount, interval, phone, isCreator} = this.props;
    let hash, transactionId;
    const updateVars = (newHash, newTransactionId) => {
      hash = newHash;
      transactionId = newTransactionId
    };
    this.setState({loading: true})

    const isLive = this.getIsLive()
    await this.props.initiateSubscriptionTransaction({
        variables: {
          phone: phone.substring(1),
          amount,
          interval,
          subscriptionId: id,
          callbackUrl: this.getCallBack(isLive),
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

  render() {
    const {amount, user, phone} = this.props;
    if (!user) return null;
    return (
      <MDBContainer>
        <h4 className={"text-center"}>Choose Payment Method</h4>
        <h5 className={"text-center"}>Amount : Ksh.{amount}</h5>
        <h6 className={"text-center"}>Phone : {phone}</h6>

        <p className={"pt-2 text-muted"}>CLick the button below to pay...</p>
        <MDBRow>
          <MDBCol size={"12"} md={"6"}>
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
                unionpay:true,
                vooma:true
              }}
              live={this.getIsLive()}
              amount={amount}
              email={user.email}
              phoneNumber={phone.substring(1)}
              callbackUrl={this.getCallBack(this.getIsLive())}
              initializeFunc={this.initializeFunction}
              customComponent={
                (props) => (
                  <PaymentMethodBtn
                    color={"white"}
                    logoSrc={"/images/ipay-logo.png"}
                    method={"I PAY"}
                    loading={this.state.loading}
                    {...props}
                  />
                )
              }/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default compose(
  graphql(INITIATE_SUBSCRIPTION_TRANSACTION, {name: 'initiateSubscriptionTransaction'})
)(PaymentMethodSection)