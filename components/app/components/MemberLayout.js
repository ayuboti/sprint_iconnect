import React from 'react';
import PropTypes from 'prop-types';
import {MDBAnimation, MDBCol, MDBRow} from "mdbreact";
import MemberSideNav, {NavSmall} from "./MemberSideNav";
import Loader from "../../Loader";
import {graphql} from "react-apollo";
import {APP_QUERY} from "../queries";
import {redirect} from "./index";
import {withRouter} from "next/router";
import ErrorPage from "../../ErrorPage";


class MemberLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false
    }
  }

  toggleFunction = () => {
    const {isOpen} = this.state;
    return this.setState({isOpen: !isOpen})
  };

  render() {
    const {
      secure,
      data: {user, memberProfile, loading, error},
      router: {pathname}
    } = this.props;
    if (loading) return <Loader fullScreen={true}/>;
    if (error) return <ErrorPage message={error.message}/>;
    if (!user && secure) return redirect("/member/login", true);
    // check if the user has a member profile and if not
    // redirect the user to set it
    if (!memberProfile && (pathname !== '/member/account/member-profile') && user)
      return redirect('/member/account/member-profile')

    return (
      <>
        <MDBAnimation type={"fadeIn"}>
          <NavSmall toggleFunction={this.toggleFunction}/>
          <div className={"overflow-hidden"}>
            <MDBRow className={"f-100-no-mobile"} center>
              <MemberSideNav toggleFunction={this.toggleFunction}
                             isOpen={this.state.isOpen}
                             user={user}
                             className={"z-depth-1 px-0"}/>
              <MDBCol size={"12"} lg={"9"} className={"my-auto px-0"}>
                {this.props.children}
              </MDBCol>
            </MDBRow>
          </div>
        </MDBAnimation>
      </>
    )
  }
}

MemberLayout.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object
};

export default graphql(
  APP_QUERY
)(withRouter(MemberLayout))
