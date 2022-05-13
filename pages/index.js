// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { Heading } from "@chakra-ui/react";
// import { useState } from 'react';
import ContentComponent from '../components/home/content.section.component';
import HeroComponent from '../components/home/hero.component';
import NewUserFreeCoins from '../components/home/newusercoins.component';
// import HomeLayout from '../components/layout/homelayout';
import Layout from '../components/layout/layout';
import NavHeader from '../components/nav/header.component';
import { useUser } from '../utils/auth/userContext';

export default function Home() {
  const { userDoc, setUserDoc } = useUser();

  // const [freeClaimShow, setFreeClaimShow] = useState(userDoc.freeClaim);

  return (
    <Layout name='home' desc='Predict and win always'>
      <div className='bg-[#0D37CE] min-h-screen w-full'>
        <div className='bg-yellow-300 pb-4 w-full'>
          <NavHeader />

          <HeroComponent />
        </div>
        {/* <div className='bg-[#0D37CE]'> */}
        <div className='w-full'>
          {/* <div className='text text-center'></div> */}
          <ContentComponent userDoc={userDoc} />
        </div>

        {userDoc && !userDoc?.freeClaim ? (
          <div className='pt-16 pb-3 mx-4 '>
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
