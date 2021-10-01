import React from "react"
import {withRouter} from "next/router";
import {MDBContainer} from "mdbreact";
import Loader from "../../../../components/Loader";
import {API_URL} from "../../../../_constants"
import {redirect} from "../../../../components/app/components";

class CallbackPage extends React.PureComponent {
  state = {
    finished: false
  }

  sendCallback = async () => {
    const {router} = this.props;
    const data = router.query
    return await fetch(`${API_URL}/payments/subscription-callback`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
  }

  render() {
    const {finished} = this.state;
    if (finished)
      return redirect('/subscriber/subscriptions')
    this.sendCallback().then(
      () => {
        this.setState({finished: true})
      }
    )
    return (
      <MDBContainer className={"pt-5 mt-5"}>
        <h1 className={"text-center"}>Await to be redirected ... </h1>
        <Loader fullScreen/>
      </MDBContainer>
    );
  }
}

export default withRouter(CallbackPage)
