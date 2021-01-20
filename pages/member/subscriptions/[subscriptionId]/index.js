import React from 'react';
import {withApollo} from "../../../../apollo";
import SubscriptionPage from "../../../../components/SubscriptionPage";
import {withMemberLayout} from "../../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(SubscriptionPage, {secure: true})
);
