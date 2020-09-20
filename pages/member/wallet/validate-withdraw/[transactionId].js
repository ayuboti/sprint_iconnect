import {withApollo} from "../../../../apollo";
import ValidateWithdraw from "../../../../components/ValidateWithdraw";
import {withMemberLayout} from "../../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(ValidateWithdraw, {secure: true})
);