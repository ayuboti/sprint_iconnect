import React, {PureComponent} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from 'mdbreact';
import PropTypes from "prop-types"

const ChannelButton = (props) => {
  const {channel, src} = props;
  return (
    <MDBCol size={"10"} sm={"6"} md={"4"} className={"mt-3"}>
      <MDBBtn color={"white"}
              style={{borderRadius: ".75rem",}}
              className={"z-depth-1 w-100  h-100 text-center"} {...props}>

        <img alt={` ${channel} icon`} src={src}
             style={{width: "100px", height: "70px"}}/>
        <br/>
        {channel}
      </MDBBtn>
    </MDBCol>
  )
}

export class ChannelForm extends PureComponent {

  changeHandler = object => {
    this.props.onChange(object)
  };
  submitHandler = e => {
    e.preventDefault()
    this.props.nextStepFunc()
  }
  setChannel = (channel) => {
    this.props.onChange({
      channel
    })
  }

  render() {
    return (
      <MDBContainer className={"mr-5 pr-5"}>
        <MDBRow>
          <ChannelButton
            onClick={
              () => {
                this.setChannel("paybill")
                this.props.nextStepFunc()
              }
            }
            src={"/images/mpesa-logo.svg"}
            channel={"PAYBILL NUMBER"}/>
          <ChannelButton
            onClick={
              () => {
                this.setChannel("till")
                this.props.nextStepFunc()
              }
            }
            src={"/images/mpesa-logo.svg"}
            channel={"TILL NUMBER"}/>
          <ChannelButton
            onClick={
              () => {
                this.setChannel("bank")
                this.props.nextStepFunc()
              }
            }
            src={"/images/bank-icon.png"}
            channel={"BANK"}/>
          <ChannelButton
            onClick={
              () => {
                this.setChannel("phone")
                this.props.nextStepFunc()
              }
            }
            src={"/images/mobile-icon.png"}
            channel={"Mobile Phone"}/>
        </MDBRow>
      </MDBContainer>
    )
  }
}

ChannelForm.propTypes = {
  nextStepFunc: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
