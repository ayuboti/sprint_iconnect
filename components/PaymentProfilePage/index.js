import React from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {PAYMENT_PROFILE_QUERY} from "./queries";
import {graphql} from "react-apollo"
import {NextSeo} from "next-seo";
import PaymentPhoneForm from "./components/PaymentPhoneForm";
import ChangePaymentPhoneModal from "./components/ChangePaymentPhoneModal";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

import Link from "next/link";

class PaymentProfilePage extends React.PureComponent {
  state = {
    changePhone: {
      isOpen: false
    }
  }
  changePhoneToggle = () => {
    this.setState({
      changePhone: {
        isOpen: !this.state.changePhone.isOpen
      }
    })
  }

  render() {
    const {data: {loading, error, paymentProfile}} = this.props
    if (loading) return <Loader/>
    if (error) return <ErrorPage message={error.message} />

    if (!paymentProfile) {
      return (
        <>
          <NextSeo title={"Add Payment Profile"}/>
          <MDBContainer>
            <MDBRow center>
              <MDBCol size={"12"} md={"6"}>
                <PaymentPhoneForm paymentProfile={paymentProfile}/>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>
      )
    }

    const {changePhone} = this.state;
    return (
      <>
        <NextSeo title={"Payment Profile"}/>
        <MDBContainer>
          <h1 className={"mb-5"}>Payment Profile</h1>
          <MDBRow>
            <MDBCol size={"12"} md={"6"} className={"mt-3"}>
              <ChangePaymentPhoneModal toggle={this.changePhoneToggle} isOpen={changePhone.isOpen}
                                       paymentProfile={paymentProfile}/>
              <MDBCard style={{borderRadius: "1rem"}} className={"h-100"}>
                <MDBCardTitle className={"text-dark p-3 border-bottom"}>
                  Payment Phone
                </MDBCardTitle>
                <MDBCardBody className={"text-center"}>
                  <p>
                    CURRENT PHONE NUMBER : {paymentProfile.phone}
                    {
                      paymentProfile.phoneVerified ?
                        <MDBBtn size={"sm"} className={"rounded-pill"} color={"success"}>verified</MDBBtn> :
                        <MDBBtn size={"sm"} className={"rounded-pill"} color={"danger"}>unverified</MDBBtn>
                    }
                  </p>
                  {paymentProfile.phoneVerified ?
                    null :
                    <Link href={'/member/account/payment/verify-phone'}>
                      <a>
                        <MDBBtn className={"rounded-pill mt-4"}>
                          Verify Phone Number
                        </MDBBtn>
                      </a>
                    </Link>
                  }
                  <MDBBtn className={"rounded-pill mt-4"} onClick={this.changePhoneToggle}>
                    Change Phone Number
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
  }
}

export default graphql(PAYMENT_PROFILE_QUERY)(PaymentProfilePage);
