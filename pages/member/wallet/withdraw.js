import {withApollo} from "../../../apollo";
import WithdrawPage from "../../../components/WithdrawPage";

import {withMemberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(WithdrawPage, {secure: true})
);