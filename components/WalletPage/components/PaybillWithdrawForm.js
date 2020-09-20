import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBRow} from 'mdbreact';
import {Field} from "../../FIeld";
import {MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY} from "../queries";
import WithdrawQueued from "./WithdrawQueued";

export class PaybillWithdrawForm extends PureComponent {
  state = {
    amount: "",
    errors: {},
    submitted: false,
    queued: false,
    transactionId: null
  }
  completeHandler = ({withdraw: {transaction, errors}}) => {
    if (transaction) {
      this.setState({
        queued: true,
        transactionId: transaction.id
      })
      return
    }
    this.setState({errors})
    console.log(transaction)
    console.log(errors)
  }
  onChange = object => {
    this.setState(object)
  };

  getFormData = () => {
    const {errors, loading, ...formData} = this.state;
    return formData
  };


  mutationOptions = {
    refetchQueries: [{query: WALLET_QUERY}]
  };

  render() {
    // submission state
    const {amount, submitted, errors, queued, transactionId} = this.state;

    if (queued) return (
      <WithdrawQueued transactionId={transactionId}/>
    )
    const {mutation} = this.props;

    return (
      <>
        <div>
          <MDBRow className={"h-100"}>
            <MDBCol size={"12"} md="9" className={"rounded m-auto"}>
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

PaybillWithdrawForm.propTypes = {
  mutation: PropTypes.any.isRequired,
  initial: PropTypes.object,
  balance: PropTypes.number.isRequired,
};
