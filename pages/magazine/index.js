import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import { useRouter } from 'next/router';
// import { useUser } from '../../utils/auth/userContext';
// import MagazineEmptyComponent from '../../components/emptypages/magazine.empty';
import FeaturedMagazine from '../../components/magazine/FeaturedMagazine';
import axios from 'axios';
import AllMagazines from '../../components/magazine/AllMagazines';
import { useUser } from '../../utils/auth/userContext';
import { useRouter } from 'next/router';
const qs = require('qs');
import AOS from 'aos';
import 'aos/dist/aos.css';

const MagazinePage = ({ featuredData, allMags }) => {
  // console.log('data :>> ', featuredData);
  // console.log('allMags :>> ', allMags);

  // **********RESTORE*************************
  const { user } = useUser();
  const router = useRouter();
  // console.log(allDocs);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  // **********RESTORE*************************

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout name='magazine' desc='I-predict Magazine'>
      <NavHeader />
      <div className='mx-4'>
        <div
          data-aos='fade-left'
          data-aos-duration='1500'
          data-aos-easing='ease-out-back'
          className='text text-center my-5'
        >
          <Heading>News Magazine</Heading>
        </div>
        <div className='space-y-7 pb-10'>
          <FeaturedMagazine data={featuredData} />
          <AllMagazines data={allMags} />
        </div>
      </div>
    </Layout>
  );
};

export default MagazinePage;

export async function getStaticProps() {
  // * Get all the magazines
  const query = qs.stringify(
    {
      filters: {
        featured: {
          $eq: true,
        },
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const queryMag = qs.stringify(
    {
      sort: ['id:desc'],
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/magazines?${query}`
  );
  const { data: allMags } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/magazines?${queryMag}`
  );
  // #####################################################################

  return {
    props: {
      featuredData: data?.data,
      allMags: allMags?.data,
      // activeSubs: activeSubs?.data,
    },
    revalidate: 5,
  };
}
