import React from "react";
import {MDBCol, MDBIcon, MDBRow} from "mdbreact";
import {graphql} from "react-apollo";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import {StepContainer, StepItem} from "../SubscriptionPaymentPage/components";
import {WITHDRAW_QUERY} from "./queries";
import {AmountForm} from "./components/AmountForm";
import {ChannelForm} from "./components/ChannelForm";
import PaymentDetailsSection from "./components/PaymentDetailsSection";

class WithdrawPage extends React.PureComponent {
  state = {
    collapseID: "amount",
    finished: [],
    amount: 0,
    channel: "",
    success: false
  }
  changeHandler = object => {
    this.setState(object)
  }
  toggleCollapse = collapseID => () => {
    let valid = false;
    if (collapseID === 'amount')
      valid = true;
    if (collapseID === 'channel') {
      if (this.state.finished.includes('amount'))
        valid = true;
    }
    if (collapseID === 'finish') {
      if (this.state.finished.includes('amount') && this.state.finished.includes('channel'))
        valid = true;
    }
    if ((this.state.collapseID !== collapseID) && valid)
      this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
      }));
  }

  nextStep = ({currentStep, nextStep}) => {
    const finished = this.state.finished
    if (!finished.includes(currentStep))
      finished.push(currentStep)
    this.setState({
      finished,
      collapseID: nextStep
    })
  }

  render() {
    const {data: {loading, error, wallet, paymentProfile}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <ErrorPage message={error.message}/>;

    const {collapseID, amount, channel} = this.state;

    return (
      <MDBRow center>
        <MDBCol size={"11"}>
          <StepContainer>
            <StepItem
              id={"amount"}
              toggle={this.toggleCollapse}
              name={"Amount"}
              currentID={collapseID}
              icon={className => (<MDBIcon icon={"money-check-alt"} className={className}/>)}>
              <AmountForm
                nextStepFunc={() => this.nextStep({currentStep: 'amount', nextStep: 'channel'})}
                onChange={this.changeHandler}
                balance={wallet.balance}
                amount={amount}/>
            </StepItem>
            <StepItem id={"channel"}
                      toggle={this.toggleCollapse}
                      name={"Send to"}
                      currentID={collapseID}
                      icon={className => (<MDBIcon icon={"university"} className={className}/>)}>
              <ChannelForm
                nextStepFunc={() => this.nextStep({currentStep: 'channel', nextStep: 'finish'})}
                onChange={this.changeHandler}
                balance={wallet.balance}
                amount={amount}/>
            </StepItem>
            <StepItem id={"finish"}
                      toggle={this.toggleCollapse}
                      name={"Account Details"}
                      currentID={collapseID}
                      icon={className => (<MDBIcon icon={"money-check"} className={className}/>)}>
              <h4 className={"text-center"}>Amount : Ksh. {amount}</h4>
              <PaymentDetailsSection
                paymentProfile={paymentProfile}
                amount={amount}
                channel={channel}/>
            </StepItem>
          </StepContainer>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default graphql(
  WITHDRAW_QUERY
)(WithdrawPage)
