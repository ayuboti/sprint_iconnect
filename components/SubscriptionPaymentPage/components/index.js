import React from "react";
import {MDBAnimation, MDBCollapse} from "mdbreact";
import PropTypes from "prop-types";

export class StepContainer extends React.PureComponent {

  render() {
    return (
      <ol className="step pl-0">
        {this.props.children}
      </ol>
    )
  }
}

export class StepItem extends React.PureComponent {
  state = {
    animation: true
  }

  render() {
    const {id, toggle, name, currentID, children, icon} = this.props
    const className = "hover-fade waves-ripple number btn-outline-default"

    const isSelected = currentID === id

    return (
      <li className="step-element pb-0">
        <div className="step-number" onClick={toggle(id)}>
          {icon(className)}
        </div>
        <div className="step-excerpt w-100">
          <p className={`pt-2 ${isSelected ? "d-none" : ""}`}>{name}</p>
          <MDBCollapse id={id} isOpen={currentID}>
            <h4>{name}</h4>
            <MDBAnimation type={"fadeIn"} >
              {children}
            </MDBAnimation>
          </MDBCollapse>
        </div>
      </li>
    )
  }

}

StepItem.propTypes = {
  id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  currentID: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.func.isRequired
}
