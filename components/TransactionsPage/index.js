import React from "react"
import {graphql} from "react-apollo"
import Loader from "../Loader";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {TRANSACTIONS_QUERY} from "./queries";
import {withRouter} from "next/router";

class TransactionsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.router.query.search
    }
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.router.push({
        pathname: '/member/transactions',
        query: {
          search: this.state.query
        }
      }
    )
  }

  changeHandler = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    const {data: {error, loading, subscriptionTransactions}} = this.props;
    if (loading) return <Loader/>

    if (error) return <h1>{error.message}</h1>

    const subscriptionList = subscriptionTransactions.map(
      ({mpesaCode, amount, phone, state, userSubscription: {subscription, email, name}}) => {
        let stateButton;
        if (state === "SUCCESS")
          stateButton = <MDBBtn size={"sm"} color={"success"}>Success</MDBBtn>
        if (state === "FAILED")
          stateButton = <MDBBtn size={"sm"} color={"danger"}>Failed</MDBBtn>
        if (state === "PENDING")
          stateButton = <MDBBtn size={"sm"} color={"warning"}>Pending</MDBBtn>
        return (
          <tr>
            <td>{subscription.name}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{amount}</td>
            <td>{mpesaCode}</td>
            <td>{stateButton}</td>
          </tr>
        )
      }
    )
    return (
      <MDBContainer fluid className={"px-4"}>
        <h1>Transactions</h1>
        <form onSubmit={this.submitHandler}>
          <MDBRow>
            <MDBCol size={"12"} md={"8"}>
              <MDBInput label={"Search by either Phone Number or Email or M-Pesa code"} group required
                        value={this.state.query}
                        onChange={this.changeHandler}/>
            </MDBCol>
            <MDBCol size={"12"} md={"4"} className={"text-center"}>
              <MDBBtn type={"submit"} className={"rounded-pill"} outline>
                <MDBIcon icon={'search'} className={"mx-2"}/>
                SEARCH
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
        <MDBContainer>
          <MDBTable responsiveMd>
            <MDBTableHead>
              <tr>
                <th>Paid to</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>M-pesa Code</th>
                <th>State</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {subscriptionList}
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      </MDBContainer>
    )
  }
}

export default withRouter(
  graphql(
    TRANSACTIONS_QUERY,
    {
      options: (props) => {
        const {search} = props.router.query;
        return {
          variables: {
            query: search
          }
        }
      }
    })(TransactionsPage))