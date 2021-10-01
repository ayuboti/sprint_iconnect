import React from "react";
import PropTypes from 'prop-types'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow} from 'mdbreact'

export default class AdminCard extends React.PureComponent {
  render() {
    const {icon, iconClass} = this.props;

    let value = Math.round(this.props.value)
    if (!value)
      value = this.props.value

    return (
      <MDBCard className={"my-3 h-100"} role={"button"} style={{borderRadius: "1rem"}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol size={"12"}>
              <MDBCardTitle className={"pl-2 pb-2 border-bottom border-grey mb-3"}>
                {this.props.title}
              </MDBCardTitle>
            </MDBCol>
            <MDBCol size={"12"}>
              <MDBBtn className={"z-depth-none"} style={{borderRadius: "1rem"}} color={'primary'} outline>
                <MDBIcon icon={icon ? icon : "cog"} className={iconClass ? iconClass : ""}/>
              </MDBBtn>
              <MDBCardText tag={"span"} className={"float-right"} style={{fontSize: "2rem"}}>
                {value}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

AdminCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  iconClass: PropTypes.string
}
