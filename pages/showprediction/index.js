import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import { useUser } from "../../utils/auth/userContext";
import ShowPredictionComponent from '../../components/showpredictions/showpredictions.component';
import { useUser } from '../../utils/auth/userContext';
const ShowPrediction = () => {
  const router = useRouter();
  const { user } = useUser();
  console.log(user);
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <Layout name='predictions' desc='See all Users Predictions'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>All Predictions</Heading>
        </div>
        {/* <ContentComponent /> */}
        <ShowPredictionComponent />
      </div>
    </Layout>
  );
};

export default ShowPrediction;
