import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow} from "mdbreact";
import PropTypes from "prop-types";

const ChooseAmountItem = props => {
  const {title, number, onChange, interval, maxNumber, onSelect, price, duration} = props

  const amount = number * price
  return (
    <MDBListGroupItem className={"rounded border-0 my-2 z-depth-1"}>
      <MDBRow center>
        <MDBCol size={"12"}>
          <h3>{title} <small>@ Ksh.{price} per {duration}</small></h3>
        </MDBCol>
        <MDBCol size={"12"} md="7">
          <MDBInput
            valueDefault={"1"}
            min="1"
            max={maxNumber}
            type={"number"}
            label={`Number of ${duration}s`}
            value={number.toString()}
            onChange={onChange(interval)}/>
        </MDBCol>
        <MDBCol size={"12"} md={"6"}>
          <MDBBtn
            size="lg"
            onClick={onSelect(interval, (price * number).toString())}
            className={"rounded-pill float-left w-100"}>
            <MDBIcon icon={"money-bill"} className={"mx-2"}/>
            <span style={{fontSize: "0.80rem"}}>Pay: Ksh.{amount}</span>
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBListGroupItem>
  )
}

class ChooseAmountForm extends React.PureComponent {
  state = {
    daily: 1,
    weekly: 1,
    monthly: 1,
    yearly: 1,
  }
  changeHandler = (interval) => {
    const newState = {}
    return e => {
      newState[interval] = e.target.value
      this.setState(newState)
    }
  }
  selectHandler = (interval, amount) => {

    return () => {
      this.props.onChange({
        amount: amount.toString(),
        interval,
        frequency: this.state[interval]
      })
      this.props.nextStep('finish')
    }
  }

  render() {
    const {subscription: {dailyPrice, weeklyPrice, monthlyPrice, yearlyPrice}} = this.props;
    return (
      <MDBRow center>
        <MDBCol size={"12"} md={"10"}>
          <MDBContainer>
            <MDBListGroup>
              {dailyPrice ?
                <ChooseAmountItem title={"Daily Subscription"}
                                  number={this.state.daily}
                                  onChange={this.changeHandler}
                                  interval={"daily"}
                                  duration={"day"}
                                  maxNumber={"4"}
                                  onSelect={this.selectHandler}
                                  price={dailyPrice}/>
                : null
              }
              {weeklyPrice ?
                <ChooseAmountItem title={"Weekly Subscription"}
                                  number={this.state.weekly}
                                  onChange={this.changeHandler}
                                  interval={"weekly"}
                                  duration={"week"}
                                  maxNumber={"4"}
                                  onSelect={this.selectHandler}
                                  price={weeklyPrice}/>
                : null
              }
              {monthlyPrice ?
                <ChooseAmountItem title={"Monthly Subscription"}
                                  number={this.state.monthly}
                                  onChange={this.changeHandler}
                                  interval={"monthly"}
                                  duration={"month"}
                                  maxNumber={"4"}
                                  onSelect={this.selectHandler}
                                  price={monthlyPrice}/>
                : null
              }
              {yearlyPrice ?
                <ChooseAmountItem title={"Yearly Subscription"}
                                  number={this.state.yearly}
                                  onChange={this.changeHandler}
                                  interval={"yearly"}
                                  duration={"year"}
                                  maxNumber={"4"}
                                  onSelect={this.selectHandler}
                                  price={yearlyPrice}/>
                : null
              }
            </MDBListGroup>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    )
  }

}


ChooseAmountForm.propTypes = {
  subscription: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  nextStep: PropTypes.func
}
export default ChooseAmountForm
