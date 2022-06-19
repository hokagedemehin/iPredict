// import { Heading } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import { useUser } from '../../utils/auth/userContext';
import NavHeader from '../../components/nav/header.component';
import Layout from '../../components/layout/layout';
import TriviaHomePageComponent from '../../components/triviagame/trivia.homepage.component';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/userContext';

const TriviaGamesPage = ({ data }) => {
  const router = useRouter();
  const { user } = useUser();
  // console.log(data);

  // ****************RESTORE*************************
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  // ****************RESTORE*************************
  return (
    <Layout name='trivia' desc='I-Predict Trivia Game'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          {/* <Heading>Trivia Game</Heading> */}
        </div>
        <TriviaHomePageComponent data={data} />
      </div>
    </Layout>
  );
};

export default TriviaGamesPage;

export async function getStaticProps() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz-buttons`
  );
  return {
    props: {
      data: data?.data,
    }, // will be passed to the page component as props
    revalidate: 5,
  };
}
