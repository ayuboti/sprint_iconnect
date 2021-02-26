import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from 'mdbreact';
import {MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY} from "../../WalletPage/queries";
import {PAYBILL_WITHDRAW_MUTATION} from "../queries";

export default class PaybillForm extends PureComponent {
  constructor(props) {
    super(props);
    const {paybillNumber, paybillNarration} = props;
    this.state.paybillNumber = paybillNumber
    this.state.paybillNarration = paybillNarration
  }

  state = {
    paybillNumber: "",
    paybillNarration: "",
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
    const {submitted, errors, paybillNarration, paybillNumber} = this.state;
    return (
      <>
        <div>
          <MDBRow className={"h-100"}>
            <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
              <MutationForm data={this.getFormData()}
                            onCompleted={this.completeHandler}
                            mutation={PAYBILL_WITHDRAW_MUTATION}
                            mutationOptions={this.mutationOptions}>
                <div className={"p-3"}>
                  <MDBRow>
                    <MDBCol size={"12"}>
                      <MDBInput
                        label={"Paybill / Business Number"}
                        onChange={e => {
                          this.setState({paybillNumber: e.target.value})
                        }}
                        valueDefault={paybillNumber ? paybillNumber : ""}
                      />
                    </MDBCol>
                    <MDBCol size={"12"}>
                      <MDBInput
                        type={"textarea"}
                        rows={"2"}
                        label={"Account Number/ Reason For Payment"}
                        valueDefault={paybillNarration ? paybillNarration : ""}
                        onChange={e => {
                          this.setState({paybillNarration: e.target.value})
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

PaybillForm.propTypes = {
  amount: PropTypes.number.isRequired,
  paybillNumber: PropTypes.any,
  paybillNarration: PropTypes.any
};
