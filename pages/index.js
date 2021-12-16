// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { Heading } from "@chakra-ui/react";
import ContentComponent from "../components/home/content.section.component";
import HeroComponent from "../components/home/hero.component";
import Layout from "../components/layout/layout";
import NavHeader from "../components/nav/header.component";

export default function Home() {
  return (
    <Layout name="home" desc="Predict and win always">
      <div className="bg-yellow-300 pb-4">
        <NavHeader />
        <HeroComponent />
      </div>
      <div className="">
        <div className="text text-center my-5">
          {/* <Heading>Admin Page</Heading> */}
        </div>
        <ContentComponent />
      </div>
    </Layout>
  );
}
