import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
// import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import NewShowPredictionComponent from '../../components/showpredictions/new.showpredictions.component';
import { useUser } from '../../utils/auth/userContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { useUser } from "../../utils/auth/userContext";
// import ShowPredictionComponent from '../../components/showpredictions/showpredictions.component';
// import { useUser } from '../../utils/auth/userContext';
const ShowPrediction = () => {
  const router = useRouter();
  const { user } = useUser();
  // console.log(user);

  // ****************RESTORE*************************
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  // ****************RESTORE*************************
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Layout name='predictions' desc='See all Users Predictions'>
      <NavHeader />
      <div className=''>
        <div
          data-aos='fade-left'
          data-aos-duration='1500'
          data-aos-easing='ease-out-back'
          className='text text-center my-5'
        >
          <Heading>All Predictions</Heading>
        </div>
        <NewShowPredictionComponent />
      </div>
    </Layout>
  );
};

export default ShowPrediction;
