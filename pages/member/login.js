import React from 'react';
import {withApollo} from "../../apollo";
import LoginPage from "../../components/LoginPage";
import {withMemberLayout} from "../../components/app";

export default withApollo()(
  withMemberLayout(LoginPage,{secure:false})
);
