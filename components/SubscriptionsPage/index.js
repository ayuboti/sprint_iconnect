import React from 'react'
import {graphql} from 'react-apollo';
import {SUBSCRIPTIONS_QUERY} from "./queries";
import {APP_QUERY} from "../app/queries";
import SubscriptionListSection from "./components/SubscriptionListSection";
import compose from "lodash.flowright"
import {NextSeo} from "next-seo";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

class SubscriptionsPage extends React.PureComponent {

  render() {
    const {data: {loading, error, user}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <ErrorPage message={error.message} />

    return (
      <>
        <NextSeo title={"Subscriptions"}/>
        <SubscriptionListSection subscriptions={user.subscriptions}/>
      </>
    )
  };
}

export default compose(
  graphql(APP_QUERY),
  graphql(SUBSCRIPTIONS_QUERY)
)(SubscriptionsPage);
