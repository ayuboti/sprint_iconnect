import React from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {graphql} from "react-apollo";
import {SWITCH_PLAN_MUTATION} from "../queries";
import {redirect} from "../../app/components";
import {MEMBER_PLAN_QUERY} from "../../MemberPlanPage/queries";

class SwitchBetweenPlan extends React.PureComponent {
  clickHandler = () => {
    this.props.switchPlan({
      refetchQueries:[
        {query:MEMBER_PLAN_QUERY}
      ]}
      ).then(
      ({data: {switchPlan: {successStatus}}}) => {
        if (successStatus)
          redirect('/member/account/member-plan')
      }
    )
  }

  render() {
    const {plan, userPlan:{name}, pricing} = this.props;
    const currentPlan = pricing[name];
    const nextPlan = pricing[plan];
    return (
      <MDBContainer>
        <h1 className={"text-center text-capitalize"}>
          Switch from {name} to {plan}
        </h1>
        <div className={"text-center"}>
          <MDBBtn onClick={this.clickHandler} className={"my-3 rounded-pill"} outline>
            SWITCH
          </MDBBtn>
        </div>
        <MDBContainer className={"mt-5"}>
          <MDBRow>
            <MDBCol size={"12"} md={"5"}>
              <MDBCard style={{borderRadius: "1rem"}} className={"h-100"}>
                <MDBCardHeader color={"white lighten-4"}
                               style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem",}}>
                  <h3 className="text-capitalize text-dark">{currentPlan.name}</h3>
                </MDBCardHeader>
                <MDBCardBody>
                  <h3 className="card-title pricing-card-title mb-4">
                    Ksh.{currentPlan.monthlyPrice}<small className="text-muted">/ mo</small>
                  </h3>
                  <h5 className="card-title pricing-card-title mb-4">
                    {(currentPlan.commission * 100).toFixed(2)}% commission
                  </h5>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol size={"12"} md={"2"} className={"text-center"}>
              <h3 className={"my-3"}>to</h3>
            </MDBCol>
            <MDBCol size={"12"} md={"5"}>
              <MDBCard style={{borderRadius: "1rem"}} className={"h-100"}>
                <MDBCardHeader color={"white lighten-4"}
                               style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem",}}>
                  <h3 className="text-capitalize text-dark ">{plan}</h3>
                </MDBCardHeader>
                <MDBCardBody>
                  <h3 className="card-title pricing-card-title mb-4">
                    Ksh.{nextPlan.monthlyPrice}<small className="text-muted">/ mo</small>
                  </h3>
                  <h5 className="card-title pricing-card-title mb-4">
                    {(nextPlan.commission * 100).toFixed(2)}% commission
                  </h5>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    )
  }
}


export default graphql(SWITCH_PLAN_MUTATION, {name: 'switchPlan'})(SwitchBetweenPlan)