import React from 'react';
import {withApollo} from "../../../../apollo";
import SubscriptionTransactionPage from "../../../../components/SubscriptionTransactionPage";
import {withSubscriberLayout} from "../../../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(SubscriptionTransactionPage, {secure: true})
);
