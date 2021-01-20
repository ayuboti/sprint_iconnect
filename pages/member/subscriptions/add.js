import React from 'react';
import {withApollo} from "../../../apollo";
import SubscriptionEditPage from "../../../components/SubscriptionEditPage"
import {withMemberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(SubscriptionEditPage, {secure: true})
);
