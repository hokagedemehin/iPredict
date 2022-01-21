import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/userContext';
import NewsTransferEmptyComponent from '../../components/emptypages/newsandtransfer.empty';

const NewsAndTransfersPage = () => {
  const { user } = useUser();
  const router = useRouter();
  // console.log(allDocs);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <Layout name='news' desc='I-Predict news and transfers'>
      <NavHeader />
      <div className='max-w-sm mx-auto'>
        <div className='text text-center my-5'>
          <Heading>News & Transfers</Heading>
        </div>
        {/* <ContentComponent /> */}
        <NewsTransferEmptyComponent />
      </div>
    </Layout>
  );
};

export default NewsAndTransfersPage;
