import React, {Component} from "react";
import {MDBContainer, MDBIcon, MDBNav, MDBNavItem, MDBTabContent, MDBTabPane} from "mdbreact";
import NavLink from "../../NavLink";
import SubscribersTable from "./SubscribersTable";

class SubscribersSection extends Component {
  state = {
    activeItem: "1"
  }

  toggle = tab => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  }

  render() {
    const activeClassName = "bg-default white-text"
    const defaultClassName = "bg-white black-text"
    const {activeItem} = this.state
    const {activeSubscribers, inActiveSubscribers} = this.props.subscription

    return (
      <MDBContainer fluid>
        <MDBNav tabs className={"nav-justified"} color={"white"}>
          <MDBNavItem>
            <NavLink
              active={activeItem === "1"}
              onClick={this.toggle("1")}
              role="tab"
              className={`${defaultClassName} ${activeItem === "1" ? activeClassName : ""} z-depth-1 rounded mx-1`}>
              <MDBIcon far icon="grin-beam" className={"mx-1"}/>Active
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink
              active={this.state.activeItem === "2"}
              onClick={this.toggle("2")}
              role="tab"
              className={`${defaultClassName} ${activeItem === "2" ? activeClassName : ""} z-depth-1 rounded mx-1`}>
              <MDBIcon far icon="frown" className={"mx-1"}/>
              Inactive
            </NavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent
          className="card p-0"
          activeItem={this.state.activeItem}
        >
          <MDBTabPane tabId="1" role="tabpanel">
            <SubscribersTable students={activeSubscribers} title={"Active Subscribers"}/>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <SubscribersTable students={inActiveSubscribers} title={"Inactive Subscribers"}/>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}

export default SubscribersSection;
