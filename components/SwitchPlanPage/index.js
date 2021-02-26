import React from "react";
import {withRouter} from "next/router";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {MEMBER_PLAN_QUERY} from "../MemberPlanPage/queries";

import {redirect} from "../app/components";
import PayForSubscription from "./components/PayForSubscription";
import SwitchBetweenPlan from "./components/SwitchBetweenPlan";
import SwitchToFree from "./components/SwitchToFree";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import NotFoundPage from "../404Page";

const plans = ["free", "basic", "premium"];


const SwitchPlanPage = props => {
  const {
    router: {query: {plan}},
    data: {loading, error, user,plan:userPlan, pricing}
  } = props;
  if (loading) return <Loader/>;
  if (error) return <ErrorPage message={error.message}/>;
  if (!plans.includes(plan)) return <NotFoundPage/>;

  // if current user plan is the
  // same as the plan to pay for
  if (userPlan.name === plan) {
    // if free is to free redirect to member plan
    // to look for a subscription
    if (plan === "free") return redirect('/member/account/member-plan');
    // pay for the plan
    return <PayForSubscription user={user} plan={plan} price={pricing[plan].monthlyPrice}/>;
  }
  // switch from one of the paid plans to free
  if (plan === "free") return <SwitchToFree plan={userPlan}/>;

  if (userPlan.name === "free") return <PayForSubscription user={user} plan={plan} price={pricing[plan].monthlyPrice}/>;

  // if the plan is being switched between the basic and premium package
  return <SwitchBetweenPlan plan={plan}  userPlan={userPlan} pricing={pricing}/>;
}
export default withRouter(
  compose(
    graphql(MEMBER_PLAN_QUERY)
  )(SwitchPlanPage)
)
