import React from 'react'
import './sidenav.css'

class SideNav extends React.Component {

  render() {
    const className = this.props.className || "";
    const {hide} = this.props;
    const hideClass = hide ? `sidenav-hide-${hide}` : "";
    const classes = (this.props.isOpen) ? `sidenav-open ${hideClass}` : "";

    const overlayClass = (this.props.isOpen) ? "overlay-open" : "";

    return (
      <>
        <div className={`sidenav  ${classes}  ${className}`}>
        <span className="closebtn px-4 z-depth-1 cyan darken-4 text-white rounded-circle"
              style={{cursor: 'pointer'}}
              onClick={this.props.toggleFunction}>&times;</span>
          {this.props.children}
        </div>
        <div className={`sidenav-overlay ${overlayClass}`} onClick={this.props.toggleFunction}/>
      </>
    )
  }
}

SideNav.defaultProps = {
  isOpen: false,
  toggleFunction: function () {
  }
};


export {SideNav};