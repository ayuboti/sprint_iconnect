import React from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBIcon, MDBRow} from "mdbreact";
import Link from "next/link";

export const MemberPlanPricingItem = ({children}) => (
  <>
    <li className={"border-0"}>
      {children}
    </li>
  </>
)

export const MemberPlanPricing = ({plan, price, commission, children}) => {
  return (
    <MDBCard style={{borderRadius: "1rem"}} className={"h-100"}>
      <MDBCardHeader color={"white lighten-4"} style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem",}}>
        <h3 className="text-capitalize text-dark">{plan}</h3>
      </MDBCardHeader>
      <MDBCardBody>
        <h3 className="card-title pricing-card-title mb-4">
          Ksh.{price}<small className="text-muted">/ mo</small>
        </h3>
        <ol className="list-unstyled mb-4">
          <MemberPlanPricingItem>

            <h6>{(commission * 100).toFixed(2)}% commission
              <MDBIcon icon={"check"} className="green-text ml-1"/>
            </h6>
          </MemberPlanPricingItem>
        </ol>
        <Link href={"/member/account/member-plan/[plan]"} as={`/member/account/member-plan/${plan}`}>
          <a>
            <MDBBtn color={"primary"} className={"rounded-pill"}>
              Switch Now
            </MDBBtn>
          </a>
        </Link>
      </MDBCardBody>
    </MDBCard>
  )
}

export const MemberPlanSubscription = ({subscription: {plan, startDate, endDate, duration}}) => {
  return (
    <MDBCard style={{borderRadius: "1rem"}} className={"h-100"}>
      <MDBCardHeader className="text-uppercase text-dark font-weight-bold" color={"teal lighten-5"}
                     style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem",}}>
        <h3>PLAN : {plan}</h3>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBRow className={"text-center"}>
          <MDBCol size={"12"} sm={"6"} md={"12"}>
            <p>AMOUNT PAID : Ksh.0</p>
            <p>DURATION : {duration ? "" : "For Life"}</p>
          </MDBCol>
          <MDBCol size={"12"} sm={"6"} md={"12"}>
            <p>VALID FROM : {startDate ? new Date(startDate).toDateString() : "N/A"}</p>
            <p>VALID TO : {endDate ? new Date(endDate).toDateString() : "N/A"}</p>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  )
}
