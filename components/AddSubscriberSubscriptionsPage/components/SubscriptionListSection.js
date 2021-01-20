import React from 'react'
import {MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow} from 'mdbreact'
import SubscriptionCard from "./SubscriptionCard";
import PropTypes from 'prop-types'
import Link from "next/link";

const PriceListItem = ({price, interval}) => {
  return (
    <MDBCol size={"12"} className={"bold-text px-1 text-center"}>
      <p className={"bold-text p-1 rounded-pill z-depth-1 bg-teal"}>@Ksh.{price} {interval}</p>
    </MDBCol>
  )
}

class PriceList extends React.PureComponent {
  state = {
    collapseID: ""
  }
  toggle = () => {
    const {collapseID} = this.state;
    const {subscription: {id}} = this.props
    this.setState({collapseID: collapseID ? "" : `${id}-price-list`});
  }

  render() {
    const {subscription: {id, dailyPrice, weeklyPrice, monthlyPrice, yearlyPrice}} = this.props;
    const isOpen = this.state.collapseID === `${id}-price-list`;

    return (
      <div className={"mt-2"}>
        <h5 className={"text-center"}>
          Price
          <MDBBtn className={"p-0 rounded-circle ml-4"} outline onClick={this.toggle}
                  style={{height: "2rem", width: "2rem"}}>
            <MDBIcon className={"p-0"} icon={isOpen ? "minus" : "plus"}/>
          </MDBBtn>
        </h5>
        <MDBCollapse id={`${id}-price-list`} isOpen={isOpen}>
          <MDBRow className={"mx-1"}>
            {dailyPrice ? <PriceListItem price={dailyPrice} interval={"daily"}/> : null}
            {weeklyPrice ? <PriceListItem price={weeklyPrice} interval={"weekly"}/> : null}
            {monthlyPrice ? <PriceListItem price={monthlyPrice} interval={"monthly"}/> : null}
            {yearlyPrice ? <PriceListItem price={yearlyPrice} interval={"yearly"}/> : null}
          </MDBRow>
        </MDBCollapse>
      </div>
    )
  }
}

class SubscriptionListSection extends React.PureComponent {

  render() {
    const {subscriptions} = this.props;
    //list of the courses
    const subscriptionsList = subscriptions ? subscriptions.map(
      (subscription, key) => (
        <MDBCol key={key} size={"12"} md={"4"} className={"my-2"}>
          <SubscriptionCard title={subscription.name}>
            {subscription.description}<br/>
            <PriceList subscription={subscription}/>
            <div className={"w-100 text-center"}>
              <Link href={'/subscriber/subscriptions/[subscriptionId]'}
                    as={`/subscriber/subscriptions/${subscription.id}`}>
                <a className={"btn btn-default rounded-pill mt-1 mb-1"}>SUBSCRIBE</a>
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
              <MDBRow>
                {subscriptionsList}
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