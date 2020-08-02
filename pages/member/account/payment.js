import {withApollo} from "../../../apollo";
import PaymentInfoPage from "../../../components/PaymentInfoPage";
import {withMemberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(PaymentInfoPage, {secure: true})
)