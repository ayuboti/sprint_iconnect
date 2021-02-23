import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";


class PhoneNumberForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      phone: props.phone ? "" : "+254"
    };
  }

  state = {
    loading: false,
    errors: [],
  }

  submitHandler = event => {
    event.preventDefault();
    this.nextStep();
  }

  changeHandler = ({target: {value}}) => {
    if (this.isValidPhone(value)) {
      this.props.onChange({phone: value});
      this.setState({phone: value, errors: []});
      return
    }
    this.setState({
      phone: value,
      errors: ['Invalid Phone Number']
    });
  }

  nextStep = () => {
    this.setState(this.defaultState)
    return this.props.nextStep("finish")
  }
  isValidPhone = (phone) => {
    const pattern = /^\+254(?:[0-9] ?){8,11}[0-9]$/;
    return Boolean(pattern.test(phone));
  }

  render() {
    let {errors, phone, loading} = this.state;
    let inputErrors;
    if (!errors.length) {
      if (!this.isValidPhone(phone))
        errors = errors.concat(['Invalid Phone Number'])
    }
    inputErrors = errors.map(
      (error, key) => (
        <div key={key} className="invalid-feedback">
          {error}
        </div>
      )
    )

    const invalidClass = inputErrors.length && phone ? "is-invalid" : "";
    const validClass = !inputErrors.length && phone ? "is-valid" : "";

    return (
      <form onSubmit={this.submitHandler} className="mb-5">
        <MDBRow center>
          <MDBCol size={"12"} md={"10"}>
            <MDBRow center>
              <MDBCol size={"11"} md={"6"}>
                Enter your phone number in international format.
                e.g +254xxx xxx xxx
                <MDBInput
                  type={"text"}
                  required
                  valueDefault={phone}
                  disabled={loading}
                  label={"Phone number"}
                  onChange={this.changeHandler}
                  className={validClass + " " + invalidClass}>
                  {inputErrors}
                  <div className={"valid-feedback"}>Valid Phone Number!!</div>
                </MDBInput>
              </MDBCol>
              <MDBCol size={"12"}/>
              <MDBCol size={"11"} md={"6"} className={"text-center"}>
                <MDBBtn className={"rounded-pill"} type={"submit"}
                        disabled={this.state.loading || validClass === ""}>
                  NEXT
                  <MDBIcon icon={"arrow-right"} className={"mx-2 rounded-pill"}/>
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </form>
    )
  }
}

export default PhoneNumberForm