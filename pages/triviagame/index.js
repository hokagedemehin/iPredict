import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUser } from '../../utils/auth/userContext';
import NavHeader from '../../components/nav/header.component';
import Layout from '../../components/layout/layout';
import TriviaHomePageComponent from '../../components/triviagame/trivia.homepage.component';

const TriviaGamesPage = () => {
  const router = useRouter();
  const { user } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <Layout name='trivia' desc='I-Predict Trivia Game'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text text-center my-5'>
          <Heading>Trivia Game</Heading>
        </div>
        <TriviaHomePageComponent />
      </div>
    </Layout>
  );
};

export default TriviaGamesPage;
