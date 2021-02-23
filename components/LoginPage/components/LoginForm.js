import React from 'react';
import {MDBAlert, MDBAnimation, MDBCol, MDBRow} from 'mdbreact';
import {GoogleLogin} from "react-google-login";
import {GOOGLE_CONFIG} from "../../../_constants";
import {APP_QUERY} from "../../app/queries";
import {login} from "../../../_helpers";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {loginWithGoogle} from "../queries";
import GoogleButton from "./GoogleButton";

const {client_id, scope} = GOOGLE_CONFIG;


class LoginForm extends React.PureComponent {
  state = {
    errors: [],
    loading: false
  }

  onFail = (data) => {
    const errors = ['An Error has occured.Please try again']
    this.setState({errors})
  }
  responseGoogle = ({accessToken, profileObj: {imageUrl}}) => {
    this.setState({loading: true});
    this.props.loginWithGoogle({
      refetchQueries: [{query: APP_QUERY},],
      variables: {accessToken, imageUrl}
    }).then(
      ({data: {loginWithGoogle}}) => {
        // check if the token is in the data
        // call the login function
        if (loginWithGoogle) {
          // operation successful
          login(loginWithGoogle, this.props.redirectUrl)
        } else {
          this.setState({errors: loginWithGoogle.errors, loading: false})
        }
      }
    );
  };
  getErrors = () => {
    if (!this.state.errors)
      return null
    return this.state.errors.map(
      (error, key) => {
        if (error.field === undefined) return (
          <MDBAnimation type={"fadeInDown"} key={key}>
            <MDBAlert color={"danger"} className={"text-center z-depth-1 mb-4"}>{error}</MDBAlert>
          </MDBAnimation>
        )
        return error.errors.map(
          (error, key) => (
            <MDBAnimation type={"fadeInDown"} key={key}>
              <MDBAlert color={"danger"} className={"text-center z-depth-1 mb-4"}>
                {error}
              </MDBAlert>
            </MDBAnimation>
          )
        )
      }
    )
  }

  render() {
    const {loading} = this.state;
    const {buttonOnly} = this.props;
    if (buttonOnly)
      return  (
        <>
          {this.getErrors()}
          <GoogleLogin
                clientId={client_id}
                scope={scope}
                render={renderProps => <GoogleButton {...renderProps} loading={loading}/>}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.onFail}
              />
        </>
      )
    return (
      <>
        <MDBRow className={"h-100"} center>
          <MDBCol size={"11"}
                  md="6" lg={"5"} className={"m-auto z-depth-1 bg-white"}
                  style={{borderRadius: "1rem"}}>
            {this.getErrors()}
            <div className={"p-3"}>
              <h4 className={"text-center text-dark"}>Sign In With Google</h4>
              <div className={"d-flex justify-content-right mt-4 mb-5 ml-3"}>
                <GoogleLogin
                  clientId={client_id}
                  scope={scope}
                  render={renderProps => <GoogleButton {...renderProps} loading={loading}/>}
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.onFail}
                />
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </>
    );
  }
}

export default compose(
  graphql(loginWithGoogle, {name: 'loginWithGoogle'})
)(LoginForm)
