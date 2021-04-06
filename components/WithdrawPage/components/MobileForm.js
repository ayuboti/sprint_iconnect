import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from 'mdbreact';
import {FormAlerts, MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY} from "../../WalletPage/queries";
import {PHONE_WITHDRAW_MUTATION} from "../queries";
import {format_errors} from "../../../_helpers";
import {redirect} from "../../app/components";

export default class MobileForm extends PureComponent {
  constructor(props) {
    super(props);
    const {phone} = props;
    this.state.phone = phone;
  }

  state = {
    phone: "+254",
    errors: [],
    submitted: false
  }

  completeHandler = ({withdrawPhone: {transaction, errors}}) => {
    if (transaction) {
      // redirect to withdraw transaction page
      redirect(`/member/transactions/wallet/${transaction.id}`)
      return
    }
    this.setState({errors: format_errors(errors)})
  }

  getFormData = () => {
    const {errors, submitted, ...formData} = this.state;
    return {
      ...formData,
      amount: this.props.amount
    }
  };
  mutationOptions = {
    refetchQueries: [{query: WALLET_QUERY}]
  };

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
    let {errors, phone} = this.state;
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
      <>
        <div>
          <MDBRow className={"h-100"}>
            <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
              <MutationForm data={this.getFormData()}
                            onCompleted={this.completeHandler}
                            mutation={PHONE_WITHDRAW_MUTATION}
                            mutationOptions={this.mutationOptions}>
                <div className={"p-3"}>
                  <FormAlerts errors={errors.nonFieldErrors}/>
                  <MDBRow>
                    <MDBCol size={"12"}>
                      <MDBInput
                        required
                        label={"Phone Number e.g +254XXXXXXXXX"}
                        onChange={this.phoneChangeHandler}
                        className={validClass + " " + invalidClass}
                        valueDefault={phone ? phone : ""}>
                        {inputErrors}
                        <div className={"valid-feedback"}>Valid Phone Number!!</div>
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  <div className="text-center">
                    <MDBBtn type="submit" outline color={"cyan accent-1"}
                            className={"rounded-pill "}>
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

MobileForm.propTypes = {
  amount: PropTypes.any.isRequired,
  phone: PropTypes.any
};
