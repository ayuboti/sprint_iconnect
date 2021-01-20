import React from "react";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {SUBSCRIPTION_QUERY} from "./queries";
import {withRouter} from "next/router";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import SubscribersSection from "./components/SubscribersSection";
import AdminCard from "../AdminCard";
import Link from "next/link";
import {NextSeo} from "next-seo";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import NotFoundPage from "../404Page";

class SubscriptionPage extends React.PureComponent {
  state = {
    copied: false
  }
  copyPaymentLink = paymentLink => {
    navigator.clipboard.writeText(paymentLink)
    this.setState({copied: true})
  }

  render() {
    const {data: {loading, error, subscription}} = this.props;
    if (loading) return <Loader/>;
    if (error)return <ErrorPage message={error.message} />
    if (!subscription) return <NotFoundPage/>
    const {id, name, isOwner} = subscription;
    if (!isOwner) return <NotFoundPage/>

    const paymentLink = `${window.location.origin}/subscriber/subscriptions/${id}/pay`;

    return (
      <>
        <NextSeo title={name}/>
        <MDBContainer fluid className={"py-3 px-4"}>
          <h1 className={"pl-3"}>{name}</h1>
          <MDBRow center>
            <MDBCol size={"12"}>
              <MDBRow center>
                <MDBCol size={"12"} sm={"6"} lg={"4"} className={"my-2"}>
                  <AdminCard
                    title={"Subscribers"}
                    iconClass={"fa-user"}
                    value={subscription ? subscription.subscriberCount : "0"}/>
                </MDBCol>
                <MDBCol size={"12"} sm={"6"} lg={"4"} className={"my-2"}>
                  <AdminCard
                    title={"Total Earnings"}
                    iconClass={"fa-money-bill"}
                    value={subscription ? subscription.totalPaid : "0"}/>
                </MDBCol>
                <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                  <AdminCard
                    title={"Total Transactions"}
                    iconClass={"fas fa-user"}
                    value={subscription ? subscription.transactionsCount : "0"}/>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol size={"12"} className={"px-3"}>
              <MDBRow>
                <MDBCol size={"12"} md={"6"} className={"h-100 my-4"}>
                  <MDBContainer fluid className={"my-2 py-3 z-depth-1 "} style={{borderRadius: "1rem"}}>
                    <h2>Payment Link</h2>
                    <MDBContainer>
                      <p>
                        <a href={paymentLink} target="_blank" style={{wordBreak: "break-word"}}>
                          {paymentLink}
                        </a>
                        <MDBBtn size={"sm"} className={"px-2 ml-3"} onClick={() => this.copyPaymentLink(paymentLink)}>
                          <MDBIcon icon={"copy"} className={"mx-2 rounded"}/>
                          {this.state.copied ? "COPIED" : "COPY"}
                        </MDBBtn>
                      </p>
                    </MDBContainer>
                  </MDBContainer>
                </MDBCol>
                <MDBCol size={"12"} md={"6"} className={"mt-4 mb-2"}>
                  <MDBContainer fluid className={"my-2 py-3 z-depth-1 "} style={{borderRadius: "1rem"}}>
                    <h2>Edit Subscription</h2>
                    <MDBContainer className={"text-center"}>
                      <Link href={`/member/subscriptions/[subscriptionId]/edit`}
                            as={`/member/subscriptions/${id}/edit`}>
                        <a>
                          <MDBBtn size={"lg"} className={"ml-3"} style={{borderRadius: "1rem"}}>
                            <MDBIcon icon={"edit"} className={"mr-2 rounded"}/>
                            EDIT
                          </MDBBtn>
                        </a>
                      </Link>
                    </MDBContainer>
                  </MDBContainer>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol size={"12"} className={"px-3 mt-2"}>
              <MDBContainer fluid className={"my-2 pt-3 pb-5 z-depth-1 px-0"} style={{borderRadius: "1rem"}}>
                <h2 className={"text-underline ml-3"}>Subscribers</h2>
                <SubscribersSection subscription={subscription}/>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
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
    })
  )(SubscriptionPage)
)
