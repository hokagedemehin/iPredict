import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import PredictAndWinComponent from '../../components/predictandwin/predictandwin.component';
import { useUser } from '../../utils/auth/userContext';

const PredictAndWinPage = () => {
  const { user } = useUser();
  const router = useRouter();
  // console.log(user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <Layout name='matches' desc='I-Predict and Win'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>Predict & Win</Heading>
        </div>
        <div className='mx-2'>
          <div className='flex flex-col px-5 sm:px-10 py-5 bg-gradient-to-r from-purple-700 to-blue-600 text-center max-w-sm mx-auto rounded-lg shadow-md mb-10 text-white'>
            <Text className='font-semibold'>This week chance of winning</Text>
            <Heading className=''>N20,000</Heading>
            <Text className='text-[9px]'>
              First 10 people to get the correct scores share the price above.
            </Text>
            <Text fontSize='xs' className='mt-3 font-bold'>
              PREDICT ALL MATCHES CORRECTLY
            </Text>
          </div>
        </div>
        <PredictAndWinComponent />
      </div>
    </Layout>
  );
};

export default PredictAndWinPage;
