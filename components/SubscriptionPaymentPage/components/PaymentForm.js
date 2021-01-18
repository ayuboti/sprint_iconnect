import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import PropTypes from "prop-types";
import {withRouter} from "next/router";
import compose from 'lodash.flowright'
import {graphql} from "react-apollo";
import {SUBSCRIPTION_PAYMENT_MUTATION} from "../queries";
import PaymentPending from "./PaymentPending";
import Loader from "../../Loader";
import {router} from "next/router"

class PaymentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      loading: false,
      errors: [],
    }
    this.defaultState = this.state
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({loading: true})
    if (this.state.errors.length) return
    const {subscription: {id}, amount, interval} = this.props;
    this.props.paySubscription({
        variables: {
          phone: this.state.phone,
          amount,
          interval,
          subscriptionId: id
        }
      }
    ).then(
      ({data: {paySubscription: {errors, transaction, paymentPending}}}) => {
        if (errors) {
          let allErrors = []
          errors.forEach(({errors}) => allErrors.push(...errors))
          this.setState({errors: allErrors, loading: false})
          return
        }
        if (paymentPending) {
          this.props.router.push(
            "/subscriber/transactions/[id]",
            `/subscriber/transactions/${transaction.id}`);
        }
      }
    )
  }
  changeHandler = ({target: {value}}) => {
    const pattern = /^0(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/
    if (pattern.test(value)) {
      const finishedPhone = "+254" + value.slice(1)
      this.props.onChange({phone: finishedPhone})
      this.setState({phone: finishedPhone, errors: []});
      return
    }
    this.setState({phone: value, errors: ['Invalid Phone Number']});
  }

  nextStep = () => {
    this.setState(this.defaultState)
    return this.props.nextStep
  }

  render() {
    const {errors} = this.state;

    const inputErrors = errors.map(
      (error, key) => (
        <div key={key} className="invalid-feedback">
          {error}
        </div>
      )
    )
    const invalidClass = errors.length && this.state.phone ? "is-invalid" : "";
    const validClass = !errors.length && this.state.phone ? "is-valid" : "";


    return (
      <form onSubmit={this.submitHandler} className="mb-5">
        <div className={"text-center"}>
          <img
            className={"text-center mx-auto"}
            alt={"M Pesa Logo"}
            src={"/images/mpesa-logo.svg"}
            style={{
              width: 100,
              height: 100
            }}/>
        </div>
        <h3 className={"text-center"}>Lipa na M-pesa</h3>
        <h6 className={"text-center text-muted"}>Amount : Ksh.{this.props.amount}</h6>
        <p className="text-center">
          Enter below the <strong>safaricom</strong> phone number which you will use to pay .e.g
          <strong className="text-danger"> 07xxxxxxxx</strong>.
          <br/>
          <strong>
            Hold your phone and unlock it and wait for the payment screen to appear on your phone.
          </strong>
          <br/>
          Then you can now click on the pay button below and follow instructions on the payment screen
        </p>
        <MDBRow center>
          <MDBCol size={"12"} md={"10"}>
            <MDBRow center>
              <MDBCol size={"11"} md={"6"}>
                {this.state.loading ? <Loader/> : null}
                <MDBInput
                  type={"text"}
                  required
                  disabled={this.state.loading}
                  label={"Phone number"}
                  onChange={this.changeHandler}
                  className={validClass + " " + invalidClass}>
                  {inputErrors}
                  <div className={"valid-feedback"}>Valid Phone Number!!</div>
                </MDBInput>

              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"11"} md={"6"} className={"text-center"}>
                <MDBBtn className={"rounded-pill"} type={"submit"}
                        disabled={this.state.loading || validClass === ""}>
                  <MDBIcon icon={"money-bill"} className={"mx-2 rounded-pill"}/>
                  PAY
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </form>
    )
  }
}


PaymentForm.propTypes = {
  subscription: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  frequency:PropTypes.string.isRequired,
}

export default withRouter(
  compose(
    graphql(SUBSCRIPTION_PAYMENT_MUTATION, {name: 'paySubscription'})
  )(PaymentForm)
)
