import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from 'mdbreact';
import {FormAlerts, MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY} from "../../WalletPage/queries";
import {PAYBILL_WITHDRAW_MUTATION} from "../queries";
import {format_errors} from "../../../_helpers";
import {redirect} from "../../app/components";

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

  completeHandler = ({withdrawPaybill: {transaction, errors}}) => {
    if (transaction) {
      // redirect to withdraw transaction page
      redirect(`/member/transactions/wallet/${transaction.id}`)
      return
    }
    this.setState({errors:format_errors(errors)})
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
    const {errors, paybillNarration, paybillNumber} = this.state;
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
                  <FormAlerts errors={errors.non_field_errors}/>
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
