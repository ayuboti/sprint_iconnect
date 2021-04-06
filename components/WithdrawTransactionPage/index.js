import React from "react";
import {MDBContainer} from "mdbreact";
import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {WITHDRAW_TRANSACTION_STATUS_QUERY} from "./queries";
import {redirect} from "../app/components";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

class WithdrawTransactionPage extends React.PureComponent {

    render() {
        const {data: {loading, error, withdrawTransactionStatus: withdrawTransaction}} = this.props;
        if (loading) return <Loader/>;
        if (error) return <ErrorPage message={error.message}/>;
        if (withdrawTransaction.state !== "QUEUED")
            return redirect('/member/wallet')
        return (
            <div className={"f-50"}>
                <h1 className={"text-center"}>Transaction Pending</h1>
                <MDBContainer>
                    <Loader fullScreen/>
                </MDBContainer>
            </div>
        )
    }
}

export default withRouter(
    compose(
        graphql(WITHDRAW_TRANSACTION_STATUS_QUERY, {
            options: (props) => {
                const {transactionId} = props.router.query;
                return {
                    variables: {transactionId},
                    pollInterval: 500
                }
            }
        }),
    )(WithdrawTransactionPage)
)