import React from "react";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {USER_SUBSCRIPTION_QUERY} from "../queries";
import {withRouter} from "next/router";
import {MDBBtn, MDBCard, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import Countdown from 'react-countdown';
import Link from "next/link";
import Loader from "../../Loader";
import NotFoundPage from "../../404Page";
import ErrorPage from "../../ErrorPage";

class SubscribedSection  extends React.PureComponent {


}


export default withRouter(
  compose(
    graphql(USER_SUBSCRIPTION_QUERY, {
      options: (props) => {
        const {subscriptionId} = props.router.query;
        return {
          variables: {subscriptionId}
        }
      }
    })
  )(SubscribedSection)
)
