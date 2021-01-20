import React from 'react';
import {withApollo} from "../../apollo";
import SubscriptionPaymentGuide from "../../components/SubscriptionPaymentGuide";
import {withSubscriberLayout} from "../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(SubscriptionPaymentGuide, {secure: false})
);
