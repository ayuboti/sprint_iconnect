import React from "react"
import {MDBInput} from "mdbreact";

export const FieldErrors = props => {
  // get data from props
  const {errors} = props;
  // create a list of error message components
  const errorList = errors ? errors.map(
    (error, key) => {
      return <div key={key} className={"text-center invalid-feedback"}>{error}</div>
    }
  ) : undefined;

  // return error components
  return (
    <>
      {errorList || <div className={"text-center valid-feedback"}>Looks Good</div>}
    </>
  )
};

export class Field extends React.PureComponent {
  render() {
    /** Component to handle Field Validation **/
    const {initial, errors, className, submitted, fieldErrors, ...otherProps} = this.props;

    let validationClass = "";

    if (submitted) {
      validationClass = (!errors && !fieldErrors) ? "is-valid" : "is-invalid";
    }

    return (
      <>
        <MDBInput
          required
          className={`${className || ""} ${validationClass}`}
          valueDefault={initial}
          {...otherProps}
        >
          <FieldErrors errors={errors || fieldErrors}/>
        </MDBInput>
      </>
    )
  }
}