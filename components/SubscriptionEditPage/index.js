import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from 'mdbreact';
import {FormAlerts, MutationForm} from "../Form";
import {Field} from "../FIeld";
import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {EDIT_SUBSCRIPTION_MUTATION, SUBSCRIPTION_QUERY} from "./queries";
import {SUBSCRIPTIONS_QUERY} from "../SubscriptionsPage/queries";
import {NextSeo} from "next-seo";
import {format_errors} from "../../_helpers";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

class SubscriptionEditPage extends React.PureComponent {

  state = {
    name: "",
    description: "",
    price: "",
    dailyPrice: "",
    weeklyPrice: "",
    monthlyPrice: "",
    yearlyPrice: "",
    errors: {},
    submitted: false
  }

  completeHandler = ({editSubscription: {subscription, errors}}) => {
    if (subscription) {
      // redirect to subscription page
      this.props.router.push(
        `/member/subscriptions/[subscriptionId]`,
        `/member/subscriptions/${subscription.id}`)
    } else {
      window.scrollTo(0,0)
      // set loading state to false
      this.setState({
        loading: false,
        submitted: true,
        errors: format_errors(errors)
      })
    }
  };

  changeHandler = object => {
    this.setState(object)
  };

  getFormData = () => {
    const {name, dailyPrice, weeklyPrice, monthlyPrice, yearlyPrice, description} = this.state;
    let {data: {subscription}} = this.props;
    subscription = subscription ? subscription : {}
    const {subscriptionId} = this.props.router.query;
    return {
      id: subscriptionId ? subscriptionId : undefined,
      name: name ? name : subscription.name,
      description: description ? description : subscription.description,
      dailyPrice: dailyPrice ? dailyPrice : subscription.dailyPrice,
      weeklyPrice: weeklyPrice ? weeklyPrice : subscription.weeklyPrice,
      monthlyPrice: monthlyPrice ? monthlyPrice : subscription.monthlyPrice,
      yearlyPrice: yearlyPrice ? yearlyPrice : subscription.yearlyPrice,
    }
  };

  mutationOptions = {
    refetchQueries: [{query: SUBSCRIPTIONS_QUERY}]
  };

  render() {
    const {data: {error, loading, subscription}} = this.props;
    if (error) return <ErrorPage message={error.message}/>;
    if (loading)return <Loader/>

    const {submitted, errors} = this.state;
    return (
      <>
        <NextSeo title={subscription ? `Edit ${subscription.name}` : "Add Subscription"}/>
        <MDBContainer className={"pr-5"}>
          <MDBRow center>
            <MDBCol size={"11"} md={"10"}>
              <h1 className={"text-center"}>{subscription ? subscription.name : "Add Subscription"}</h1>
              <MutationForm data={this.getFormData()}
                            onCompleted={this.completeHandler}
                            mutation={EDIT_SUBSCRIPTION_MUTATION}
                            mutationOptions={this.mutationOptions}>
                <FormAlerts errors={errors.nonFieldErrors}/>
                <MDBRow center>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      submitted={submitted}
                      label={"Subscription Name"}
                      initial={subscription ? subscription.name : ""}
                      required
                      fieldErrors={errors.name}
                      onChange={e => this.changeHandler({name: e.target.value})}
                    />
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      type={"textarea"}
                      submitted={submitted}
                      label={"Subscription Description"}
                      initial={subscription ? subscription.description : ""}
                      required
                      fieldErrors={errors.description}
                      onChange={
                        e => this.changeHandler(
                          {description: e.target.value}
                        )
                      }
                    />
                  </MDBCol>
                  <MDBCol size={"12"}>
                    <p>
                      Choose the amount you will be charging for the respective billing intervals.
                      The charges will be billed in kenyan shillings.The lowest amount being 10 shillings.
                      <br/>
                      <i>
                        Make smaller intervals relatively more expensive to sway consumers into choosing larger
                        intervals hence locking in customers for longer periods.
                      </i>
                      <br/>
                      <b className={"mt-2"}>Filling a particular category will enable customer to subscribe to it</b>
                    </p>
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      min={"10"}
                      required={false}
                      type={"number"}
                      submitted={submitted}
                      label={"Daily (24hrs) Charge"}
                      initial={subscription ? subscription.dailyPrice : ""}
                      fieldErrors={errors.dailyPrice}
                      onChange={e => this.changeHandler({dailyPrice: e.target.value})}
                    />
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      min={"10"}
                      required={false}
                      type={"number"}
                      submitted={submitted}
                      label={"Weekly (7days) Charge"}
                      initial={subscription ? subscription.weeklyPrice : ""}
                      fieldErrors={errors.weeklyPrice}
                      onChange={e => this.changeHandler({weeklyPrice: e.target.value})}
                    />
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      min={"10"}
                      required={false}
                      type={"number"}
                      submitted={submitted}
                      label={"Monthly (30 days) Charge"}
                      initial={subscription ? subscription.monthlyPrice : ""}
                      fieldErrors={errors.monthlyPrice}
                      onChange={e => this.changeHandler({monthlyPrice: e.target.value})}
                    />
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      min={"10"}
                      required={false}
                      type={"number"}
                      submitted={submitted}
                      label={"Yearly (12 months) Charge"}
                      initial={subscription ? subscription.yearlyPrice : ""}
                      fieldErrors={errors.yearlyPrice}
                      onChange={e => this.changeHandler({yearlyPrice: e.target.value})}
                    />
                  </MDBCol>
                  <MDBCol size={"12"}/>
                  <MDBCol size={"12"} md={"6"} className={"text-center"}>
                    <MDBBtn className={"rounded-pill"} type={"submit"}>
                      <MDBIcon icon={"money"} className={"mx-2 rounded-pill"}/>
                      SUBMIT
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MutationForm>
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
  )(SubscriptionEditPage)
)
