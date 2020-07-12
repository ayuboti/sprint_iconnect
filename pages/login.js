import React from 'react';
import {withApollo} from "../apollo";
import Login from "../components/LoginPage";
import {withApp} from "../components/app";

export default withApollo()(
  withApp(Login,{secure:false})
);