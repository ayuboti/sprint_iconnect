import React from "react";
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import Loader from "../Loader";
import {StepContainer, StepItem} from "./components";
import ChooseAmountForm from "./components/ChooseAmountForm";
import PaymentLoginForm from "./components/PaymentLoginForm";
import {SUBSCRIPTION_QUERY} from "./queries";
import {NextSeo} from "next-seo";
import ErrorPage from "../ErrorPage"
import NotFoundPage from "../404Page"
import PayForSubscription from "./components/PayForSubscription";


class SubscriptionPaymentPage extends React.PureComponent {
  state = {
    collapseID: "login",
    finished: [],
    interval: "",
    amount: "",
    phone: "",
    success: false
  }

  changeHandler = object => {
    this.setState(object)
  }
  toggleCollapse = collapseID => () => {
    let valid = false;
    if (collapseID === 'login')
      valid = true;
    if (collapseID === 'amount') {
      if (this.state.finished.includes('login'))
        valid = true;
    }
    if (collapseID === 'phone') {
      if (this.state.finished.includes('login') && this.state.finished.includes('amount'))
        valid = true;
    }
    if ((this.state.collapseID !== collapseID) && valid)
      this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
      }));
  }

  nextStep = currentStep => {
    return step => {
      const finished = this.state.finished
      if (!finished.includes(currentStep))
        finished.push(currentStep)
      this.setState({
        finished,
        collapseID: step
      })
    }
  }

  render() {
    const {data: {error, loading, subscription, user}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <ErrorPage message={error.message}/>
    if (!subscription) return <NotFoundPage/>
    let isCreator;
    if (user) {
      // ban creator from paying own subscription
      isCreator = subscription.user.email === user.email
      //if (isCreator) return <CreatorLogin/>;
    }
    const {collapseID, amount, interval} = this.state;
    return (
      <MDBContainer fluid>
        <NextSeo title={"Subscription Payment"}/>
        <h1 className="text-center">Payment Form</h1>
        <h2 className="text-center text-lowercase text-muted">{subscription.name}</h2>
        <MDBRow>
          <MDBCol size={"12"}>
            <StepContainer>
              <StepItem
                id={"login"}
                toggle={this.toggleCollapse}
                name={"Login"}
                currentID={collapseID}
                icon={className => (<MDBIcon icon={"user"} className={className}/>)}>
                <PaymentLoginForm
                  subscription={subscription}
                  user={user}
                  nextStep={this.nextStep('login')}/>
              </StepItem>
              <StepItem id={"amount"}
                        toggle={this.toggleCollapse}
                        name={"Choose payment subscription and duration"}
                        currentID={this.state.collapseID}
                        icon={className => (<MDBIcon icon={"edit"} className={className}/>)}>
                <ChooseAmountForm subscription={subscription}
                                  onChange={this.changeHandler}
                                  nextStep={this.nextStep('amount')}/>
              </StepItem>
              <StepItem id={"phone"}
                        toggle={this.toggleCollapse}
                        name={"Enter your phone number"}
                        currentID={this.state.collapseID}
                        icon={className => (<MDBIcon icon={"mobile"} className={className}/>)}>
                <PayForSubscription
                  user={user}
                  subscriptionId={subscription.id}
                  amount={amount}
                  interval={interval}
                  isCreator={isCreator}/>
              </StepItem>
            </StepContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default withRouter(
  compose(
    graphql(SUBSCRIPTION_QUERY, {
      options: (props) => {
        const {subscriptionId} = props.router.query;
        return {
          variables: {subscriptionId}
        }
      }
    }),
  )(SubscriptionPaymentPage)
)
