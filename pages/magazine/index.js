import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/userContext';
import MagazineEmptyComponent from '../../components/emptypages/magazine.empty';

const MagazinePage = () => {
  const { user } = useUser();
  const router = useRouter();
  // console.log(allDocs);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <Layout name='magazine' desc='I-predict Magazine'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text text-center my-5'>
          <Heading>News Magazine</Heading>
        </div>
        {/* <ContentComponent /> */}
        <MagazineEmptyComponent />
      </div>
    </Layout>
  );
};

export default MagazinePage;
