import React from "react";
import {NextSeo} from 'next-seo';
import {withSubscriberLayout} from "../components/app";
import {withApollo} from "../apollo";

class SpeedTest extends React.PureComponent {
  render() {
    return (
      <>
        <NextSeo
          title={"Speed test"}
        />
        <div style={{textAlign: 'right'}}>
          <div style={{minHeight: '360px'}}>
            <div style={{
              width:'100%',
              height:0,
              paddingBottom:'50%',
              position:'relative'
            }}>
              <iframe style={{
                position:'absolute',
                top:0,
                left:0,
                width:'100%',
                height:'100%',
                minHeight:'360px',
                border:'none',
                overflow:'hidden !important'
              }} src="//openspeedtest.com/Get-widget.php"/>
            </div>
          </div>
          Provided by  <a href="http://openspeedtest.com">OpenSpeedtest.com</a>
        </div>
      </>
    )
  }
}

export default withApollo({ssr: false})(
  withSubscriberLayout(SpeedTest, {secure: false})
);

