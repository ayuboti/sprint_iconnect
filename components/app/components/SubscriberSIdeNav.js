import React from 'react';
import {MDBCol, MDBIcon, MDBListGroup} from "mdbreact";
import {useRouter} from 'next/router'
import {SideNav} from "../../sidenav";
import {SideNavItem, SidenavLogout, UserImage} from "./MemberSideNav";

const SideNavChildren = props => {
  const {className, user} = props;
  const {pathname} = useRouter();

  if (user)
    return (
      <>
        <SideNavItem pathname={pathname}
                     className={className}
                     href={`/subscriber`}>
          <MDBIcon icon={"home"} className={"mr-2"}/>
          Home
        </SideNavItem>
        <SideNavItem pathname={pathname}
                     className={className}
                     href={`/speed-test`}>
          <MDBIcon icon={"bolt"} className={"mr-2"}/>
          Speed Test
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/subscriber/subscriptions"}>
          <MDBIcon icon={"file-contract"} className={"mr-2"}/>
          My Subscriptions
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/subscriber/subscriptions/add"}>
          <MDBIcon icon={"plus"} className={"mr-2"}/>
          Add Subscription
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/subscriber/account"}>
          <MDBIcon far icon={"user"} className={"mr-2"}/>
          My Account
        </SideNavItem>
        <SidenavLogout className={className}>
          <MDBIcon fas icon={"sign-out-alt"} className={"mr-2 "}/>
          Logout
        </SidenavLogout>
      </>
    )
  return (
    <>
      <SideNavItem pathname={pathname}
                   className={className}
                   href={`/subscriber`}>
        <MDBIcon icon={"home"} className={"mr-2"}/>
        Home
      </SideNavItem>
      <SideNavItem pathname={pathname}
                   className={className}
                   href={`/subscriber/payment-guide`}>
        <MDBIcon icon={"book-open"} className={"mr-2"}/>
        Payment Guide
      </SideNavItem>
      <SideNavItem pathname={pathname}
                   className={className}
                   href={`/subscriber/login`}>
        <MDBIcon icon={"sign-in-alt"} className={"mr-2"}/>
        Login
      </SideNavItem>
    </>
  )
}


const SubscriberSIdeNav = props => {
  const {isOpen, toggleFunction, user} = props;
  const listClass = "border border-0 rounded ";
  const listClassSide = `${listClass} account-list-padding`;

  let name = "Unknown User";
  let imageUrl = "/unknownPerson.png";
  if (user) {
    const {firstName, lastName} = user
    name = `${firstName} ${lastName}`
    imageUrl = user.imageUrl
  }
  return (
    <>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction}
               className={"bg-white text-black z-depth-1"}>
        <MDBListGroup className={"px-1"}>
          <UserImage name={name} imageUrl={imageUrl}/>
          <SideNavChildren className={listClassSide} user={user}/>
        </MDBListGroup>
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block  f-100 px-0"}>
        <div className={"pt-5 rounded f-50 h-100 z-depth-1 position-fixed col-lg-3"}>
          <MDBListGroup className={"px-1"}>
            <UserImage name={name} imageUrl={imageUrl}/>
            <SideNavChildren className={listClass} user={user}/>
          </MDBListGroup>
        </div>
      </MDBCol>
    </>
  )
}

export default SubscriberSIdeNav
