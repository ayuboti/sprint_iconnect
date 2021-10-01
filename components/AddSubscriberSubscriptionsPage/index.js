import React from 'react'
import {graphql} from 'react-apollo';
import compose from "lodash.flowright"
import {NextSeo} from "next-seo";
import {withRouter} from "next/router";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import {SUBSCRIPTIONS_QUERY} from "./queries";
import SubscriptionListSection from "./components/SubscriptionListSection";

class SubscriptionsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.router.query.search,
      hasMore:true,
    }
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.router.push({
        pathname: '/subscriber/subscriptions/add',
        query: {
          search: this.state.query
        }
      }
    )
  }
  changeHandler = e => {
    this.setState({
      query: e.target.value
    })
  }
  loadMore = (fromItem) =>{
    const {search} = this.props.router.query;
    this.props.data.fetchMore({
      variables: {
        query: search,
        number:10,
        fromItem
      },
      // concatenate old and new entries
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const addedSubscriptions = fetchMoreResult.subscriptions;
        if (addedSubscriptions.length < 1){
          this.setState({hasMore:false})
        }
        return { subscriptions: [...previousResult.subscriptions,...addedSubscriptions]}
      },
    });
  }
  render() {
    const {data: {loading, error, subscriptions}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <ErrorPage message={error.message}/>;

    return (
      <MDBContainer className={"pt-4"}>
        <NextSeo title={"Search Subscriptions"}/>
        <h1>Search Subscriptions</h1>
        <form onSubmit={this.submitHandler}>
          <MDBRow>
            <MDBCol size={"12"} md={"8"}>
              <MDBInput
                label={"Search for a subscription"}
                group required
                value={this.state.query}
                onChange={this.changeHandler}/>
            </MDBCol>
            <MDBCol size={"12"} md={"4"} className={"text-center"}>
              <MDBBtn color={"primary"} type={"submit"} className={"rounded-pill"} outline>
                <MDBIcon icon={'search'} className={"mx-2"}/>
                SEARCH
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
        <SubscriptionListSection subscriptions={subscriptions}/>
        {this.state.hasMore ?
            (<MDBCol size="12" className="mt-2 mb-2 pt-3 text-center">
              <MDBBtn
                onClick={()=>this.loadMore(subscriptions.length)}
                color={"white"}
                className={"rounded-pill mt-5"} >
                More Subscriptions
                <MDBIcon icon={'angle-down'} className={"mx-2"}/>
              </MDBBtn>
            </MDBCol>):null
          }
      </MDBContainer>
    )
  };
}

export default withRouter(
  compose(
    graphql(
      SUBSCRIPTIONS_QUERY,
      {
        options: (props) => {
          const {search} = props.router.query;
          return {
            variables: {
              query: search,
              number:12,
              fromItem:0
            }
          }
        }
      })
  )(SubscriptionsPage)
);
