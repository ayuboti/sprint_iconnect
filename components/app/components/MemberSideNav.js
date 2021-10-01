import React from 'react';
import {
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem
} from "mdbreact";
import {useRouter} from 'next/router'
import {SideNav} from "../../sidenav";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {APP_QUERY} from "../queries";
import Link from "next/link"

export function SideNavItem(props) {
  const {pathname, className, children, href, as} = props;
  return (
    <Link href={href} as={as}>
      <a>
        <MDBListGroupItem active={pathname === href} hover className={`z-depth-1 my-2 ${className}`}>
          {children}
        </MDBListGroupItem>
      </a>
    </Link>
  )
}

export const SidenavLogout = (props) => {
  const {className, children} = props;
  const [logout] = useMutation(gql`
      mutation Logout{
        logout @client
      }
    `);
  const onClick = () => {
    logout({
      refetchQueries: [
        {query: APP_QUERY}
      ]
    });
  };

  return (
    <MDBListGroupItem hover className={`z-depth-1 my-2 ${className} blue  darken-4 text-white mt-5`} onClick={onClick}>
      {children}
    </MDBListGroupItem>
  )
};

const SideNavChildren = props => {
  const {className, pathname, user} = props;
  if (user)
    // if user is authenticated return links which the user can access when logged in
    return (
      <>
        <SideNavItem pathname={pathname} className={className} href={"/member"}>
          <MDBIcon icon={"home"} className={"mr-2"}/>
          Home
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/member/subscriptions"}>
          <MDBIcon icon={"file-contract"} className={"mr-2"}/>
          Subscriptions
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/member/wallet"}>
          <MDBIcon icon={"wallet"} className={"mr-2"}/>
          Wallet
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/member/transactions"}>
          <MDBIcon icon={"scroll"} className={"mr-2"}/>
          Transactions
        </SideNavItem>
        <SideNavItem pathname={pathname} className={className} href={"/member/account"}>
          <MDBIcon far icon={"user"} className={"mr-2"}/>
          My Account
        </SideNavItem>
        <SidenavLogout className={className}>
          <MDBIcon fas icon={"sign-out-alt"} className={"mr-2 "}/>
          Logout
        </SidenavLogout>
      </>
    );
  return (
    <>
      <SideNavItem pathname={pathname} className={className} href={"/member"}>
        <MDBIcon icon={"home"} className={"mr-2"}/>
        Home
      </SideNavItem>
      <SideNavItem pathname={pathname} className={className} href={"/member/login"}>
        <MDBIcon fas icon={"sign-in-alt"} className={"mr-2"}/>
        Login/Register
      </SideNavItem>
    </>
  )
}


export const NavSmall = ({toggleFunction}) => {

  return (
    <>
      <MDBNavbar dark sticky={"top"} className={"d-md-block d-lg-none z-depth-1 bg-primary"} >
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavbarToggler onClick={toggleFunction}/>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    </>
  )
};

export const UserImage = props => {
  let {name, imageUrl} = props;
  name = name ? name : "Unknown User";
  imageUrl = imageUrl ? imageUrl : "/unknownPerson.png";
  return (
    <>
      <div className={"justify-content-center d-flex"}>
        <MDBCardImage src={imageUrl} zoom className={"rounded-circle"}/>
      </div>
      <h3 className={"text-center text-capitalize"}>{name}</h3>
    </>
  )
}

const MemberSideNav = props => {
  const {isOpen, toggleFunction, user} = props;
  const listClass = "border border-0 rounded ";
  const listClassSide = `${listClass} account-list-padding`;
  const {pathname} = useRouter();
  let name = "Unknown User";
  let imageUrl = "/unknownPerson.png";
  if (user) {
    const {firstName, lastName} = user
    name = `${firstName} ${lastName}`
    imageUrl = user.imageUrl
  }
  return (
    <>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction} className={"bg-white text-black z-depth-1"}>
        <MDBListGroup className={"px-1 pr-0"}>
          <UserImage name={name} imageUrl={imageUrl}/>
          <SideNavChildren className={listClassSide} pathname={pathname} user={user}/>
        </MDBListGroup>
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block  f-100 px-0"}>
        <div className={"pt-5 rounded f-50 h-100 z-depth-1 position-fixed col-lg-3"}>
          <MDBListGroup className={"px-1"}>
            <UserImage name={name} imageUrl={imageUrl}/>
            <SideNavChildren className={listClass} pathname={pathname} user={user}/>
          </MDBListGroup>
        </div>
      </MDBCol>
    </>
  )
}

export default MemberSideNav
