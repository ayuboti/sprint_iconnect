import React from 'react'
import {graphql} from 'react-apollo';
import compose from "lodash.flowright"
import UserSubscriptionListSection from "./components/UserSubscriptionListSection";
import ErrorPage from "../ErrorPage";
import Loader from "../Loader";
import {USER_SUBSCRIPTIONS_QUERY} from "./queries";


class SubscriberSubscriptionsPage extends React.PureComponent {

  render() {
    const {data: {loading, error, user}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <ErrorPage message={error.message}/>;

    return <UserSubscriptionListSection userSubscriptions={user.userSubscriptions}/>
  };
}

export default compose(
  graphql(USER_SUBSCRIPTIONS_QUERY)
)(SubscriberSubscriptionsPage);
