import React from "react";
// import { BackToTop } from "material-ui-back-to-top";
import Head from "next/head";
// import NavHeader from "../home/header/navheader.components";
// import FooterNav from "../home/footer/navfooter.component";

const Layout = ({ children, name, desc }) => {
  return (
    <div>
      <Head>
        <title>I-Predict - {name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={desc} />
        <link rel="icon" href="/logo/ipredict.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        {/* <meta
          name="google-site-verification"
          content="shrWGcYhhJuGhM5foR7h_xJ8sMkmcNotSWcNhIHuNfk"
        /> */}
      </Head>
      {/* <NavHeader /> */}
      <div className="bg-gray-200">
        <main className="min-h-screen max-w-sm mx-auto bg-white">
          {children}
        </main>
      </div>
      {/* <FooterNav /> */}
      {/* <BackToTop size="small" /> */}
    </div>
  );
};

export default Layout;
