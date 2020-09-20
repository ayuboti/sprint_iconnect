import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBRow} from 'mdbreact';
import {Field} from "../../FIeld";
import {FormAlerts, MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY, WITHDRAW_CONFIRM_MUTATION} from "../queries";
import WithdrawQueued from "./WithdrawQueued";
import {format_errors} from "../../../_helpers";
import ResendOtpCode from "./ResendOtpCode";

class WithdrawOTPForm extends PureComponent {
  state = {
    otpCode: "",
    errors: {},
    submitted: false,
    queued: false,
  }
  mutationOptions = {
    refetchQueries: [{query: WALLET_QUERY}]
  };

  completeHandler = ({confirmWithdraw: {transaction, errors}}) => {
    if (transaction) {
      this.setState({queued: true})
      return
    }
    this.setState({errors: format_errors(errors), submitted: true})
  }

  onChange = object => {
    this.setState(object)
  };

  getFormData = () => {
    return {
      transactionId: this.props.transaction.id,
      otpCode: this.state.otpCode
    }
  };

  render() {
    const {submitted, errors, queued} = this.state;
    const {transaction} = this.props;
    if (queued) return (
      <WithdrawQueued transactionId={transaction.id}/>
    )
    return (
      <>
        <div>
          <MDBRow className={"h-100"}>
            <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
              <FormAlerts errors={errors.nonFieldErrors}/>
              <MutationForm data={this.getFormData()}
                            onCompleted={this.completeHandler}
                            mutation={WITHDRAW_CONFIRM_MUTATION}
                            mutationOptions={this.mutationOptions}>
                <div className={"p-3"}>
                  <MDBRow center>
                    <MDBCol size={"12"} className={"text-center"}>
                      <p className={"text-info"}>Enter the code which we have sent on your phone through SMS.</p>
                      <ResendOtpCode transaction={transaction}/>
                      <Field
                        submitted={submitted}
                        label={"OTP code"}
                        onChange={e => {
                          this.onChange({otpCode: e.target.value})
                        }}
                        errors={errors.otpCode}
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

WithdrawOTPForm.propTypes = {
  transaction: PropTypes.object.isRequired
};
export default WithdrawOTPForm