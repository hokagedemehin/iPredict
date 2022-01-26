// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { Heading } from "@chakra-ui/react";
import ContentComponent from '../components/home/content.section.component';
import HeroComponent from '../components/home/hero.component';
// import HomeLayout from '../components/layout/homelayout';
import Layout from '../components/layout/layout';
import NavHeader from '../components/nav/header.component';

export default function Home() {
  return (
    <Layout name='home' desc='Predict and win always'>
      <div className='bg-yellow-300 pb-4'>
        <NavHeader />
        <HeroComponent />
      </div>
      {/* <div className='bg-[#0D37CE]'> */}
      <div className=''>
        {/* <div className='text text-center'></div> */}
        <ContentComponent />
      </div>
    </Layout>
  );
}
