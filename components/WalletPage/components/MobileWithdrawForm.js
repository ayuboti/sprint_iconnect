import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBRow} from 'mdbreact';
import {Field, FieldErrors} from "../../FIeld";
import {MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY} from "../queries";
import WithdrawOTPForm from "./WithdrawOTPForm";
import {format_errors} from "../../../_helpers";

export class MobileWithdrawForm extends PureComponent {
  state = {
    amount: "",
    errors: {},
    submitted: false,
    transaction: null
  }
  mutationOptions = {
    refetchQueries: [{query: WALLET_QUERY}]
  };

  completeHandler = ({withdrawPhone: {transaction, errors}}) => {
    if (transaction) {
      this.setState({transaction: transaction})
      return
    }
    this.setState({errors: format_errors(errors), submitted: true})
  }

  onChange = object => {
    this.setState(object)
  };

  getFormData = () => {
    const {amount} = this.state;
    return {amount}
  };

  render() {
    const {amount, submitted, errors, queued, transaction} = this.state;
    if (transaction) return (
      <WithdrawOTPForm transaction={transaction}/>
    )
    const {mutation} = this.props;

    return (
      <>
        <div>
          <MDBRow className={"h-100"}>
            <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
              <FieldErrors errors={errors.nonFieldErrors}/>
              <MutationForm data={this.getFormData()}
                            onCompleted={this.completeHandler}
                            mutation={mutation}
                            mutationOptions={this.mutationOptions}>
                <div className={"p-3"}>
                  <MDBRow>
                    <MDBCol size={"12"}>
                      <Field
                        type={"number"}
                        max={this.props.balance}
                        min={"50"}
                        submitted={submitted}
                        label={"Amount in Ksh"}
                        initial={amount}
                        onChange={e => {
                          this.onChange({amount: e.target.value})
                        }}
                        errors={errors.amount}
                      />
                    </MDBCol>
                  </MDBRow>
                  <div className="text-center">
                    <MDBBtn type="submit" outline color={"cyan accent-1"} className={"rounded-pill "}>
                      Submit
                    </MDBBtn>
                  </div>
                </div>
              </MutationForm>
            </MDBCol>
          </MDBRow>
        </div>
      </>
    )
  }
}

MobileWithdrawForm.propTypes = {
  mutation: PropTypes.any.isRequired,
  initial: PropTypes.object,
  paymentProfile: PropTypes.object.isRequired,
  balance: PropTypes.number.isRequired,
};
