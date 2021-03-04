import React from "react";
import TransactionsPage from "../../../../components/WithdrawTransactionPage"
import {withMemberLayout} from "../../../../components/app"
import {withApollo} from "../../../../apollo";

export default withApollo({ssr:false})(
  withMemberLayout(TransactionsPage)
)