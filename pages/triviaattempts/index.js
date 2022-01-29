import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUser } from '../../utils/auth/userContext';
import NavHeader from '../../components/nav/header.component';
import Layout from '../../components/layout/layout';
import TriviaAttemptsPageComponent from '../../components/triviagame/attempts/trivia.attempts.component';

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
    <Layout name='trivia-attempts' desc='I-Predict Trivia Attempts'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>Trivia Attempts</Heading>
        </div>
        <TriviaAttemptsPageComponent />
      </div>
    </Layout>
  );
};

export default TriviaGamesPage;
