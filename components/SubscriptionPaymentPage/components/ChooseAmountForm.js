import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import PropTypes from "prop-types";

const ChooseAmountItem = props => {
  const {title, number, onChange, interval, maxNumber, onSelect, price, duration} = props

  const amount = number * price
  return (
    <MDBCol size={"12"} md={"6"} className={"p-2"}>
      <div className={"rounded border-0 my-2 z-depth-1 p-3 h-100"}>
        <MDBRow center>
          <MDBCol size={"12"}>
            <h5 className={"text-center"}>{title}</h5>
            <h6 className={"text-center"}><strong>Ksh.{price} per {duration}</strong></h6>
          </MDBCol>
          <MDBCol size={"12"} md="10">
            <MDBInput
              valueDefault={"1"}
              min="1"
              size={"sm"}
              max={maxNumber}
              type={"number"}
              label={`Number of ${duration}s`}
              value={number.toString()}
              onChange={onChange(interval)}/>
          </MDBCol>
          <MDBCol size={"12"}>
            <h6 className={'text-center'}>Amount : Ksh.{amount} </h6>
          </MDBCol>
          <MDBCol size={"12"} md={"10"}>
            <MDBBtn
              color={"teal"}
              onClick={onSelect(interval, (price * number).toString())}
              className={"rounded-pill float-left w-100"}>
              <MDBIcon icon={"money-bill"} className={"mx-2"}/>
              <span style={{fontSize: "0.80rem"}}>Pay: Ksh.{amount}</span>
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBCol>
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
      })
      this.props.nextStep('phone')
    }
  }

  render() {
    const {subscription: {dailyPrice, weeklyPrice, monthlyPrice, yearlyPrice}} = this.props;
    return (
      <MDBContainer>
        <MDBRow>
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
        </MDBRow>
      </MDBContainer>
    )
  }

}


ChooseAmountForm.propTypes = {
  subscription: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  nextStep: PropTypes.func
}
export default ChooseAmountForm
