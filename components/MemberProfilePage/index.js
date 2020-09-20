import React from "react";
import {MDBAlert, MDBAnimation, MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {MEMBER_PROFILE_MUTATION, MEMBER_PROFILE_QUERY} from "./queries";
import {graphql} from "react-apollo"
import Loader from "../Loader";
import {NextSeo} from "next-seo";
import {redirect} from "../app/components";
import {format_errors} from "../../_helpers";

class MemberProfilePage extends React.PureComponent {
  state = {
    organisationName: "",
    errors: {},
    submitted: false
  }
  getData = () => {
    const {organisationName} = this.state;
    let {data: {memberProfile}} = this.props;
    if (!memberProfile) memberProfile = {}
    return {
      organisationName: organisationName ? organisationName : memberProfile.organisationName,
    }
  }
  completeHandler = ({editMemberProfile: {memberProfile, errors}}) => {
    /**
     * if the form filling was successful redirect to the account page
     * else add the error to the state and set submitted to true so as
     * to show them
     * **/
    if (memberProfile) {
      return redirect('/member/account');
    }
    this.setState({errors: format_errors(errors), submitted: true})
  }
  changeHandler = (object) => {
    this.setState(object)
  }
  mutationOptions = {
    refetchQueries: [{query: MEMBER_PROFILE_QUERY}]
  };

  render() {
    const {data: {loading, error, memberProfile = {}}} = this.props
    if (loading) return <Loader/>
    if (error) return <h1>{error.message}</h1>
    // flag for whether the member Profile is new or not
    const newProfile = !memberProfile;
    // if new Profile show error alert on top
    let createAlert = null;
    if (newProfile)
      createAlert = (
        <>
          <MDBCol size={"10"} md={"6"}>
            <MDBAnimation type={"bounceIn"}>
              <MDBAlert color={"danger"} className={"z-depth-1"}>
                Fill in Membership Profile
              </MDBAlert>
            </MDBAnimation>
          </MDBCol>
          <MDBCol size={"12"}/>
        </>
      )

    // get data from state
    const {submitted, errors} = this.state

    return (
      <>
        <NextSeo title={"Membership Profile"}/>
        <MDBContainer>
          <MutationForm mutation={MEMBER_PROFILE_MUTATION}
                        data={this.getData()}
                        mutationOptions={this.mutationOptions}
                        onCompleted={this.completeHandler}>
            <h1>Member Profile</h1>
            <MDBRow center>
              {createAlert}
              <MDBCol size={"11"} md={"6"}>
                <Field
                  submitted={submitted}
                  initial={memberProfile ? memberProfile.organisationName : ""}
                  label={"Name of Organisation"}
                  required
                  fieldErrors={errors.organisationName}
                  onChange={e => this.changeHandler({organisationName: e.target.value})}
                />
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"6"} className={"text-center"}>
                <MDBBtn type={"submit"} size={"lg"} className={"rounded-pill"}>
                  SUBMIT
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MutationForm>
        </MDBContainer>
      </>
    )
  }
}

export default graphql(MEMBER_PROFILE_QUERY)(MemberProfilePage);