import '../assets/css/dist/style.css';
import "../assets/css/home.css"

import React from 'react';
import Head from 'next/head';
import {DefaultSeo} from 'next-seo';

// This default export is required in a new `pages/_app.js` file.
function App({Component, pageProps}) {

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={"/favicon.ico"}/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
              integrity="sha512-xA6Hp6oezhjd6LiLZynuukm80f8BoZ3OpcEYaqKoCV3HKQDrYjDE1Gu8ocxgxoXmwmSzM4iqPvCsOkQNiu41GA=="
              crossOrigin="anonymous"/>
      </Head>
      <DefaultSeo
        title={"Sprint-I-Connect"}
        titleTemplate={" %s | Sprint-I-Connect"}
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
