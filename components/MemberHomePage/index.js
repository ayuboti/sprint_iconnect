import React from 'react'
import {graphql} from "react-apollo";
import {NextSeo} from "next-seo";
import compose from "lodash.flowright";

import {APP_QUERY} from "../app/queries";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import HomeUserPage from "./components/HomeUserPage";
import HomeLanding from "./components/HomeLanding";


class HomePage extends React.PureComponent {
  render() {
    const {data: {loading, error, user}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <ErrorPage message={error.message} />
    return (
      <>
        <NextSeo title={"Member"}/>
        {user ? <HomeUserPage/> : <HomeLanding/>}
      </>
    )
  }
}

export default compose(
  graphql(APP_QUERY),
)(HomePage);
