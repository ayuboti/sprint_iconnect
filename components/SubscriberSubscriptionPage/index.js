import React from "react";
import Loader from "../Loader";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {USER_SUBSCRIPTION_QUERY} from "./queries";
import {withRouter} from "next/router";
import {MDBBtn, MDBCard, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import NotSubscribedSection from "./NotSubscribedSection";
import Countdown from 'react-countdown';
import Link from "next/link";

const CountDownBox = ({value, label}) => {
  return (
    <MDBCol className={"teal accent-1 text-center mx-1 p-2 z-depth-1"} style={{borderRadius: "1rem"}}>
      <div className={"bg-white"} style={{borderRadius: "0.75rem"}}>
        <h2>{value}</h2>
      </div>
      <p>{label}</p>
    </MDBCol>
  )
}
const ExpiryCountDown = ({date}) => {
  if (!date) return <h3>N/A</h3>
  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
      // Render a completed state
      return <h3>Subscription Expired</h3>;
    } else {
      // Render a countdown
      return (
        <MDBRow>
          <CountDownBox value={days} label={"days"}/>
          <CountDownBox value={hours} label={"hours"}/>
          <CountDownBox value={minutes} label={"minutes"}/>
          <CountDownBox value={seconds} label={"seconds"}/>
        </MDBRow>
      )
    }
  };
  return <Countdown date={date} renderer={renderer}/>

}

class SubscriptionPage extends React.PureComponent {
  state = {
    copied: false
  }
  copyPaymentLink = paymentLink => {
    navigator.clipboard.writeText(paymentLink).then(() => null)
    this.setState({copied: true})
  }

  render() {
    const {data: {loading, error, subscription, userSubscription}} = this.props;
    if (loading)
      return <Loader/>
    if (error)
      return <h1>ERROR {error.message}</h1>
    if (!subscription) {
      // TODO: redirect to 404 page
      return (
        <MDBContainer>
          <h1>No Subscription Found</h1>
        </MDBContainer>
      )
    }

    if (!userSubscription) {
      return <NotSubscribedSection subscription={subscription}/>
    }
    let {expiryDate} = userSubscription;
    const {id, name} = subscription;
    const paymentUrl = `/subscriber/subscriptions/${id}/pay`

    return (
      <MDBContainer className={"py-3 px-3"}>
        <h1>{name}</h1>
        <MDBRow className={"px-3"}>
          <MDBCol size={"12"} md={"6"} className={"mb-3"}>
            <MDBRow>
              <MDBCol size={"12"} className={"pt-4"}>
                <MDBCardTitle className={"pl-2 pb-2 border-bottom mb-3 text-center"}>
                  <MDBIcon icon={"clock"} className={"mx-2"}/> Valid For
                </MDBCardTitle>
                <ExpiryCountDown date={expiryDate}/>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol size={"12"} md={"6"} className={"my-3"}>
            <MDBCard className={"h-100 p-3 text-center"} style={{borderRadius: "1rem"}}>
              <MDBCardTitle>Pay for Subscription</MDBCardTitle>
              <Link href={`/subscriber/subscriptions/[subscriptionId]/pay`} as={paymentUrl}>
                <a>
                  <MDBBtn outline size={"lg"} tag={'span'} className={"rounded-pill my-3"}>
                    <MDBIcon icon={"money-bill"} className={"mx-3"}/>
                    PAY NOW
                  </MDBBtn>
                </a>
              </Link>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default withRouter(
  compose(
    graphql(USER_SUBSCRIPTION_QUERY, {
      options: (props) => {
        const {subscriptionId} = props.router.query;
        return {
          variables: {subscriptionId}
        }
      }
    })
  )(SubscriptionPage)
)