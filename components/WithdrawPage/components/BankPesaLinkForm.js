import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from 'mdbreact';
import {MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY} from "../../WalletPage/queries";
import {BANK_WITHDRAW_MUTATION} from "../queries";

export default class BankPesaLinkForm extends PureComponent {
  constructor(props) {
    super(props);
    const {paybillNumber, paybillNarration} = props;
    this.state.paybillNumber = paybillNumber
    this.state.paybillNarration = paybillNarration
  }

  state = {
    bankAccount: "",
    bankCode: "",
    bankNarration: "",
    errors: {},
    submitted: false
  }

  completeHandler = ({withdraw: {transaction, errors}}) => {
    if (transaction) {
      // redirect to withdraw transaction page
      return
    }
    this.setState({errors})
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

  render() {
    const {submitted, errors, bankAccount, bankCode, bankNarration} = this.state;
    return (
      <>
        <div>
          <MDBRow className={"h-100"}>
            <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
              <MutationForm data={this.getFormData()}
                            onCompleted={this.completeHandler}
                            mutation={BANK_WITHDRAW_MUTATION}
                            mutationOptions={this.mutationOptions}>
                <div className={"p-3"}>
                  <MDBRow>
                    <MDBCol size={"12"}>
                      <MDBInput
                        label={"Bank Code"}
                        required={true}
                        onChange={e => {
                          this.setState({bankCode: e.target.value})
                        }}
                        valueDefault={bankCode ? bankCode : ""}
                      />
                    </MDBCol>
                    <MDBCol size={"12"}>
                      <MDBInput
                        label={"Bank Account Number"}
                        required={true}
                        onChange={e => {
                          this.setState({bankAccount: e.target.value})
                        }}
                        valueDefault={bankAccount ? bankAccount : ""}
                      />
                    </MDBCol>
                    <MDBCol size={"12"}>
                      <MDBInput
                        type={"textarea"}
                        rows={"2"}
                        required={true}
                        label={"Reason for Payment"}
                        valueDefault={bankNarration ? bankNarration : ""}
                        onChange={e => {
                          this.setState({bankNarration: e.target.value})
                        }}
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

BankPesaLinkForm.propTypes = {
  amount: PropTypes.number.isRequired,
  bankCode: PropTypes.any,
  bankAccount: PropTypes.any,
  bankNarration: PropTypes.any
};
