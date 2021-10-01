import React from 'react'
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from 'mdbreact'
import SubscriptionCard from "./SubscriptionCard";
import PropTypes from 'prop-types'
import Link from "next/link";

class SubscriptionListSection extends React.PureComponent {

  render() {
    const {subscriptions} = this.props;
    //list of the courses
    const subscriptionsList = subscriptions ? subscriptions.map(
      ({id, name, description}, key) => (
        <MDBCol key={key} size={"12"} md={"4"} className={"my-2"}>
          <SubscriptionCard title={name}>
            {description}
            <div className={"w-100 text-center"}>
              <Link href={'/member/subscriptions/[subscriptionId]'} as={`/member/subscriptions/${id}`}>
                <a className={"btn btn-default rounded-pill mt-3 mb-1"}>MANAGE SUBSCRIPTION</a>
              </Link>
            </div>
          </SubscriptionCard>
        </MDBCol>
      )
    ) : null
    return (
      <>
        <MDBContainer className={"py-3 px-3"}>
          <MDBRow center>
            <MDBCol size={"12"}>
              <div className={"px-3 py-3"}>
                <h1>Subscriptions</h1>
              </div>
              <MDBRow>
                {subscriptionsList}
                <MDBCol size={"12"} md={"4"}>
                  <SubscriptionCard title={'Add Subscription'}>
                    <div className={"w-100 text-center"}>
                      <Link href={'/member/subscriptions/add'} as={`/member/subscriptions/add`}>
                        <a className={"btn btn-primary rounded-pill mt-3 mb-1"}>
                          <MDBIcon icon={"plus"}  size={"lg"}/>
                        </a>
                      </Link>
                    </div>
                  </SubscriptionCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  };
}

SubscriptionListSection.propTypes = {
  subscriptions: PropTypes.array
}
export default SubscriptionListSection
