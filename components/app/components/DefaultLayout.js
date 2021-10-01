import React, {PureComponent} from 'react'
import {MDBCollapse, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem} from "mdbreact";
import NavLink from "../../NavLink";
import {withRouter} from "next/router";

class DefaultLayout extends PureComponent {
  constructor(props) {
    super(props);
    const {router: {asPath}} = props;
    let active;
    if ('/' === asPath)
      active = 'home'
    else if ('/#features' === asPath)
      active = 'features'
    else if ('/#pricing' === asPath)
      active = 'pricing'
    else if ('/#pricing' === asPath)
      active = 'pricing'
    else if ('/#our-team' === asPath)
      active = 'team'
    else if ('/#contact-us' === asPath)
      active = 'contact'
    this.state = {
      active: active,
      isOpen: false
    }
  }


  toggleCollapse = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  closeCollapse = () => {
    if (this.state.isOpen)
      this.setState({isOpen: false});
  }

  render() {
    const {active} = this.state
    return (
      <>
        <MDBNavbar dark fixed={"top"} color={"rgba-blue-strong"} expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Sprint-I-Connect</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse}/>
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active={'home' === active} onClick={() => this.setState({active: 'home'})}>
                <NavLink href={'/'}>Home</NavLink>
              </MDBNavItem>
              <MDBNavItem active={"features" === active} onClick={() => this.setState({active: 'features'})}>
                <NavLink href={"/#features"}>Features</NavLink>
              </MDBNavItem>
              <MDBNavItem active={"pricing" === active} onClick={() => this.setState({active: 'pricing'})}>
                <NavLink href={"/#pricing"}>Pricing</NavLink>
              </MDBNavItem>
              <MDBNavItem active={"contact" === active} onClick={() => this.setState({active: 'contact'})}>
                <NavLink href="/#contact-us">Contact Us</NavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <div onClick={this.closeCollapse}>
          {this.props.children}
        </div>
      </>
    )
  }
}

export default withRouter(DefaultLayout)
