import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import TeamCardEmptyComponent from '../../components/emptypages/teamcard.empty';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useUser } from '../../utils/auth/userContext';
// import NavHeader from "../../components/nav/header.component original";

const TeamCardsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <Layout name='team card' desc='I-Predict Team Card'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text text-center my-5'>
          <Heading>Team Cards</Heading>
        </div>

        <TeamCardEmptyComponent />
      </div>
    </Layout>
  );
};

export default TeamCardsPage;
