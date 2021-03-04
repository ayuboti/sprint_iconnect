import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from 'mdbreact';
import {FormAlerts, MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY} from "../../WalletPage/queries";
import {TILL_WITHDRAW_MUTATION} from "../queries";
import {format_errors} from "../../../_helpers";
import {redirect} from "../../app/components";

export default class TillNumberForm extends PureComponent {
  constructor(props) {
    super(props);
    const {tillNumber} = props;
    this.state.tillNumber = tillNumber;
  }

  state = {
    tillNumber: "",
    errors: {},
    submitted: false
  }

  completeHandler = ({withdrawTill: {transaction, errors}}) => {
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
    const {errors, tillNumber} = this.state;
    return (
      <>
        <div>
          <MDBRow className={"h-100"}>
            <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
              <MutationForm data={this.getFormData()}
                            onCompleted={this.completeHandler}
                            mutation={TILL_WITHDRAW_MUTATION}
                            mutationOptions={this.mutationOptions}>
                <div className={"p-3"}>
                  <FormAlerts errors={errors.non_field_errors}/>
                  <MDBRow>
                    <MDBCol size={"12"}>
                      <MDBInput
                        required={true}
                        label={"Till Number"}
                        onChange={e => {
                          this.setState({tillNumber: e.target.value})
                        }}
                        valueDefault={tillNumber ? tillNumber : ""}
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

TillNumberForm.propTypes = {
  amount: PropTypes.any.isRequired,
  tillNumber: PropTypes.any
};
