import React from "react";
import {graphql} from "react-apollo"
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import AdminCard from "../AdminCard";
import {WALLET_QUERY} from "./queries";
import Link from "next/link";
import {NextSeo} from "next-seo";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

class WalletPage extends React.PureComponent {

  render() {
    const {data: {loading, error, wallet}} = this.props;
    if (loading) return <Loader/>;
    if (error) return <ErrorPage message={error.message}/>;
    return (
      <>
        <NextSeo title={"Wallet"}/>
        <MDBContainer className={"px-4"}>
          <MDBRow>
            <MDBCol size={"12"} md={"6"} className={"my-2"}>
              <AdminCard value={`Ksh ${wallet.balance}`} title={"Wallet Balance (KES)"} iconClass={"fa-money-bill"}/>
            </MDBCol>
            <MDBCol size={"12"} md={"6"} className={"my-2"}>
              <MDBCard className={"my-3 h-100"} style={{borderRadius: "1rem"}}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol size={"12"}>
                      <MDBCardTitle className={"pl-2 pb-2 border-bottom border-grey mb-3"}>
                        Withdraw Money
                      </MDBCardTitle>
                    </MDBCol>
                    <MDBCol size={"12"} className={"text-center"}>
                      <Link href={"/member/wallet/withdraw"}>
                        <a>
                          <MDBBtn color={'primary'} size={"lg"} className={"rounded-pill my-3 w-auto"} onClick={this.toggle}>
                            <MDBIcon icon={"cash-register"} className={"mx-4"} size={"1x"}/>
                            WITHDRAW
                          </MDBBtn>
                        </a>
                      </Link>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol size={"12"}>
              <MDBCard style={{borderRadius: "1rem"}} className={"my-4 p-4"}>
                <h1>Withdraw Transactions</h1>
                <MDBTable responsive>
                  <MDBTableHead>
                    <th>Amount</th>
                    <th>State</th>
                    <th>Transaction Date</th>
                    <th>Transaction Cost</th>
                  </MDBTableHead>
                  <MDBTableBody>
                    {
                      wallet.withdrawTransactions.map(
                        ({id, amount, createdAt, transactionCost, state}, key) => {
                          let stateButton;
                          let transactionDateStr;
                          transactionDateStr = new Intl.DateTimeFormat("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric"
                          }).format(new Date(createdAt));

                          if (state === "REQUESTED")
                            stateButton = <MDBBtn size={"sm"} color={"white darken-4"}>Requested</MDBBtn>
                          if (state === "VALIDATED")
                            stateButton = <MDBBtn size={"sm"} color={"primary"}>Validated</MDBBtn>
                          if (state === "QUEUED")
                            stateButton = <MDBBtn size={"sm"} color={"warning"}>Queued</MDBBtn>
                          if (state === "SUCCESS")
                            stateButton = <MDBBtn size={"sm"} color={"success"}>Success</MDBBtn>
                          if (state === "FAILED")
                            stateButton = <MDBBtn size={"sm"} color={"danger"}>Failed</MDBBtn>
                          return (
                            <tr key={key}>
                              <td>{amount}</td>
                              <td>{stateButton}</td>
                              <td>{transactionDateStr}</td>
                              <td>{transactionCost ? `Ksh.${transactionCost}` : "N/A"}</td>
                              {state === "REQUESTED" ?
                                <td>
                                  <Link href={"/member/wallet/validate-withdraw/[transactionId]"}
                                        as={`/member/wallet/validate-withdraw/${id}`}>
                                    <a>
                                      <MDBBtn className={"rounded-pill"}>
                                        VALIDATE WITHDRAW
                                      </MDBBtn>
                                    </a>
                                  </Link>
                                </td>
                                : <td/>
                              }
                            </tr>
                          )
                        }
                      )
                    }
                  </MDBTableBody>
                </MDBTable>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  }
}


export default graphql(
  WALLET_QUERY
)(WalletPage)
