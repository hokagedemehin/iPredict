// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { Heading } from "@chakra-ui/react";
// import { useState } from 'react';
import CampaignComponent from '../components/home/campaign.component';
import ContentComponent from '../components/home/content.section.component';
import HeroComponent from '../components/home/hero.component';
import NewUserFreeCoins from '../components/home/newusercoins.component';
// import HomeLayout from '../components/layout/homelayout';
import Layout from '../components/layout/layout';
import NavHeader from '../components/nav/header.component';
import { useUser } from '../utils/auth/userContext';
const qs = require('qs');

import axios from 'axios';
import { useEffect } from 'react';
import TawkTo from 'tawkto-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// import { disableReactDevTools } from '@fvilers/disable-react-devtools';

export default function Home({ campaign }) {
  const { userDoc, setUserDoc } = useUser();
  // if (process.env.NODE_ENV == 'production') {
  //   disableReactDevTools();
  // }
  // const [freeClaimShow, setFreeClaimShow] = useState(userDoc.freeClaim);

  useEffect(() => {
    new TawkTo(
      process.env.NEXT_PUBLIC_PROPERTY_ID,
      process.env.NEXT_PUBLIC_TAWK_ID
    );
    AOS.init();
  }, []);

  return (
    <Layout name='home' desc='Predict and win always'>
      <div className='bg-[#0D37CE] min-h-screen w-full'>
        <div className='bg-yellow-300 pb-4 w-full'>
          <NavHeader />

          <HeroComponent />
        </div>
        <div
          data-aos='fade-up-right'
          data-aos-duration='1000'
          data-aos-easing='ease-out-back'
        >
          <CampaignComponent data={campaign} />
        </div>
        {/* <div className='bg-[#0D37CE]'> */}
        <div className='w-full'>
          {/* <div className='text text-center'></div> */}
          <ContentComponent userDoc={userDoc} />
        </div>

        {userDoc && !userDoc?.freeClaim ? (
          <div
            data-aos='fade-down'
            data-aos-easing='ease-out-back'
            data-aos-duration='1500'
            className='pt-16 pb-3 mx-4 '
          >
            <NewUserFreeCoins
              userDoc={userDoc}
              setUserDoc={setUserDoc}
              // setFreeClaimShow={setFreeClaimShow}
            />
          </div>
        ) : (
          ''
        )}
        {/* {userDoc && !userDoc?.freeClaim ? (
          <div className='absolute inset-x-0 bottom-0 mb-3 mx-4 '>
            <NewUserFreeCoins user={user} />
          </div>
        ) : (
          ''
        )} */}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryPopulate = qs.stringify(
    {
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );

  let campaign = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaigns?${queryPopulate}`
  );

  return {
    props: {
      campaign: campaign.data,
    },
    revalidate: 10,
  };
}
