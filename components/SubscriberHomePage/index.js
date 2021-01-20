import React, {PureComponent} from 'react'
import {graphql} from "react-apollo";
import {NextSeo} from "next-seo";

import HomeUserPage from "./components/HomeUserPage";
import HomeLanding from "./components/HomeLanding";

import {APP_QUERY} from "../app/queries";

import ErrorPage from '../ErrorPage'
import Loader from '../Loader'

class HomePage extends PureComponent {
  render() {
    const {data: {loading, error, user}} = this.props
    if (loading) return <Loader/>
    if (error) return <ErrorPage message={error.message}/>

    return  (
      <>
        <NextSeo title={"Subscriber "}/>
        {user ? <HomeUserPage user={user}/> : <HomeLanding/> }
      </>
    )
  }
}

export default graphql(
  APP_QUERY
)(HomePage);
