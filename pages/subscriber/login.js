import React from 'react';
import {withApollo} from "../../apollo";
import LoginPage from "../../components/LoginPage";
import {withSubscriberLayout} from "../../components/app";


export default withApollo()(
  withSubscriberLayout(LoginPage, {secure: false})
);
