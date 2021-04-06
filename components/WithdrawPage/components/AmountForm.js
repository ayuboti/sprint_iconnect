import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from 'mdbreact';
import {Field} from "../../FIeld";
import PropTypes from "prop-types"

export class AmountForm extends PureComponent {

  changeHandler = object => {
    this.props.onChange(object)
  };
  submitHandler = e => {
    e.preventDefault()
    const {amount, balance, onChange} = this.props;
    if (!amount)
      onChange({
        amount: balance - 100
      })
    this.props.nextStepFunc()
  }

  render() {
    const {balance, amount} = this.props;
    const availableAmount = balance - 100;
    return (

      <form onSubmit={this.submitHandler}>
        <div className={"p-3"}>
          <MDBRow>
            <MDBCol size={"12"} md={"8"} lg={"7"}>
              <h5 className={"text-center text-muted"}>Amount available:  Ksh. {availableAmount}</h5>
              <Field
                containerClass={"text-cyan"}
                type={"number"}
                max={availableAmount}
                min={"10"}
                label={"Amount(KES)"}
                initial={amount ? amount : availableAmount}
                onChange={e => {
                  this.changeHandler({amount: e.target.value})
                }}
              />
              <div className="text-center">
                <MDBBtn type="submit" outline className={"rounded-pill "}>
                  Next <MDBIcon icon={"arrow-right"}/>
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </form>
    )
  }
}

AmountForm.propTypes = {
  balance: PropTypes.any.isRequired,
  amount: PropTypes.any.isRequired,
  nextStepFunc: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
