import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import { useRouter } from 'next/router';

import NewsHomeComponents from '../../components/news/newsHomeComponents';
import { useUser } from '../../utils/auth/userContext';
// import { useUser } from '../../utils/auth/userContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewsAndTransfersPage = () => {
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
    <Layout name='news' desc='I-Predict news and transfers'>
      <NavHeader />
      <div className='bg-black text-white min-h-screen'>
        <div
          data-aos='fade-left'
          data-aos-duration='1500'
          data-aos-easing='ease-out-back'
          className='text py-5 text-center'
        >
          <Heading>News & Transfers </Heading>
        </div>
        <NewsHomeComponents />
      </div>
    </Layout>
  );
};

export default NewsAndTransfersPage;
