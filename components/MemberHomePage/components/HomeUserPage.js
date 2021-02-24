import React from 'react'
import {MDBAnimation, MDBCard, MDBCol, MDBContainer, MDBRow} from 'mdbreact'
import compose from "lodash.flowright";
import {graphql} from "react-apollo";

import AdminCard from "../../AdminCard";
import RevenueChart from "./RevenueChart";
import {MEMBER_HOME_QUERY} from "../queries";
import Loader from "../../Loader";
import ErrorPage from "../../ErrorPage";

class HomeUserPage extends React.Component {

  render() {
    const {
      data: {
        loading, error, wallet, totalEarnings,
        totalSubscribers, revenueTransactions
      }
    } = this.props;
    if (loading) return <Loader/>;
    if (error) return <ErrorPage message={error.message}/>;

    return (
      <MDBAnimation type={"fadeIn"}>
        <MDBContainer className={"py-3 px-3"} fluid>
          <MDBContainer fluid>
            <MDBRow center>
              <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                <MDBAnimation type={"fadeInDown"} delay={"2"} className={"h-100"}>
                  <AdminCard
                    title={"Total Subscribers"}
                    iconClass={"fa-user"}
                    value={totalSubscribers}/>
                </MDBAnimation>
              </MDBCol>
              <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                <MDBAnimation type={"fadeInUp"} className={"h-100"}>
                  <AdminCard
                    title={"Total Earnings (Ksh)"}
                    iconClass={"fa-money-bill"}
                    value={totalEarnings}/>
                </MDBAnimation>
              </MDBCol>
              <MDBCol size={"12"} md={"6"} lg={"4"} className={"my-2"}>
                <MDBAnimation type={"fadeInRight"} className={"h-100"}>
                  <AdminCard
                    title={"Wallet Balance (Ksh)"}
                    icon={"wallet"}
                    value={wallet.balance}/>
                </MDBAnimation>
              </MDBCol>
              <MDBCol size={"12"}>
                <MDBCard className={"mb-2 mt-4"} style={{borderRadius: "1rem"}}>
                  <RevenueChart transactions={revenueTransactions}/>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </MDBAnimation>
    )
  };
}

export default compose(
  graphql(MEMBER_HOME_QUERY),
)(HomeUserPage);
