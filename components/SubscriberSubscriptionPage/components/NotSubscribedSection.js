import React from "react"
import {MDBBtn, MDBContainer, MDBIcon} from "mdbreact";
import Link from "next/link";

export default class NotSubscribedSection extends React.PureComponent {

  render() {
    const {subscription: {id, name, description}} = this.props;
    return (
      <MDBContainer className={"text-center"}>
        <h1>{name}</h1>
        <p>{description}</p>
        <p className={"text-bold"}>One must first pay to subscribe</p>
        <Link href={`/subscriber/subscriptions/[subscriptionId]/pay`}
              as={`/subscriber/subscriptions/${id}/pay`}>
          <a>
            <MDBBtn size={"lg"} className={"rounded-pill"}>
              <MDBIcon icon={"money-bill"} className={"mx-3"}/>
              PAY NOW
            </MDBBtn>
          </a>
        </Link>
      </MDBContainer>
    )
  }
}