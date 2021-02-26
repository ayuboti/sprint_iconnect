import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBRow} from 'mdbreact';
import {MutationForm} from "../../Form";
import PropTypes from "prop-types"
import {WALLET_QUERY} from "../../WalletPage/queries";
import {TILL_WITHDRAW_MUTATION} from "../queries";

export default class MobileForm extends PureComponent {
  constructor(props) {
    super(props);
    const {phone} = props;
    this.state.phone = phone;
  }

  state = {
    phone: "",
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
    const {errors, phone} = this.state;
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
                  <MDBRow>
                    <MDBCol size={"12"}>
                      <MDBInput
                        label={"Phone Number e.g +254XXXXXXXXX"}
                        onChange={e => {
                          this.setState({phone: e.target.value})
                        }}
                        valueDefault={phone ? phone : ""}
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

MobileForm.propTypes = {
  amount: PropTypes.any.isRequired,
  phone: PropTypes.any
};
