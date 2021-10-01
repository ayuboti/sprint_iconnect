import React from 'react'
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from 'mdbreact'
import SubscriptionCard from "./SubscriptionCard";
import PropTypes from 'prop-types'
import Link from "next/link";

class UserSubscriptionListSection extends React.PureComponent {

  render() {
    const {userSubscriptions} = this.props;
    //list of the courses
    const subscriptionsList = userSubscriptions ? userSubscriptions.map(
      ({expiryDate, subscription: {id, name, description}}, key) => (
        <MDBCol key={key} size={"12"} md={"4"} className={"my-2"}>
          <SubscriptionCard title={name}>
            {description}...
            <br/>
            <span className={"font-weight-bold"}> valid until {new Date(expiryDate).toLocaleString()}</span>
            <div className={"w-100 text-center"}>
              <Link href={'/subscriber/subscriptions/[subscriptionId]'}
                    as={`/subscriber/subscriptions/${id}`}>
                <a className={"btn btn-default rounded-pill mt-3 mb-1"}>VIEW</a>
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
                      <Link href={'/subscriber/subscriptions/add'} as={`/subscriber/subscriptions/add`}>
                        <a className={"btn btn-primary rounded-pill mt-3 mb-1"}>
                          <MDBIcon icon={"plus"} size={"lg"}/>
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

UserSubscriptionListSection.propTypes = {
  userSubscriptions: PropTypes.array
}
export default UserSubscriptionListSection
