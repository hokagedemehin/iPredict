import React from 'react';
// import { BackToTop } from "material-ui-back-to-top";
// import Head from 'next/head';
import Layout from './layout';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Layout>
        <div className='bg-blue-200'>{children}</div>
      </Layout>
    </div>
  );
};

export default HomeLayout;
