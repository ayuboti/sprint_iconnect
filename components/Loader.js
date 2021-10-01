import React from "react"
import {MDBProgress} from "mdbreact"

export default class Loader extends React.PureComponent {

  render() {
    const {fullScreen} = this.props;
    let style = {};
    if (fullScreen)
      style = {
        position: "absolute",
        top: "50%"
      };
    return <MDBProgress
      preloader
      barClassName={"blue darken-4"}
      material
      wrapperStyle={style}/>
  }
}
