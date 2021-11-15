import React, {PureComponent} from 'react'
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Link from "next/link";
import {NextSeo} from "next-seo";
import Jumbotron from "../Jumbotron";
import FeatureSection from "./components/FeatureSection";
import PricingSection from "./components/PricingSection";
import ContactSection from "./components/ContactSection";
import TeamSection from "./components/TeamSection";

class HomePage extends PureComponent {
  render() {
    const description = "Sprint Wi-Fi manager is a Wi-Fi management system that helps the user and provider of Sprint Iconnect ltd to easily access and perform Wi-Fi functions at one point. "
    return (
      <>
        <NextSeo
          title={"Home"}
          description={description}/>
        <Jumbotron>
          <div style={{height: "67px"}}/>
          <MDBContainer>
            <div className="text-left">
              <h1 className={"text-center"}>Sprint IConnect</h1>
              <p style={{fontSize: "1.1rem"}} className={'text-center'}>
                {description}
              </p>
            </div>
            <h1 className={'mt-2 mb-4'}> Continue as ...</h1>
            <MDBRow>
              <MDBCol size={"12"} md={'6'} className={"text-center border-right border-left border-white"}>
                <Link href={"/member"}>
                  <a>
                    <MDBBtn tag={"span"} color={"light-blue"} size={"lg"} className={"rounded-pill"}>
                       Internet Provider
                    </MDBBtn>
                  </a>
                </Link>
              </MDBCol>
              <MDBCol size={"12"} md={'6'} className={"text-center border-right border-left border-white"}>
                <Link href={"/subscriber"}>
                  <a>
                    <MDBBtn tag={"span"} color={"light-blue"} size={"lg"} className={"rounded-pill"}>
                      Customer
                    </MDBBtn>
                  </a>
                </Link>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Jumbotron>
        <FeatureSection/>
        <PricingSection/>
        <ContactSection/>
      </>
    )
  }
}

export default HomePage
