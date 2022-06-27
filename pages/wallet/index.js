import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import WalletHomePage from '../../components/wallet/wallethome.component';
import { useUser } from '../../utils/auth/userContext';
import axios from 'axios';
import { useQuery } from 'react-query';
const qs = require('qs');
import AOS from 'aos';
import 'aos/dist/aos.css';

const UserWalletPage = ({ data }) => {
  const router = useRouter();
  const { user, userDoc, setUserDoc } = useUser();
  // console.log(user);
  // ****************RESTORE*************************
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  useEffect(() => {
    AOS.init();
  }, []);
  // ****************RESTORE*************************

  const { data: freshCoins } = useQuery(
    'coins',
    async () => {
      const query = qs.stringify(
        {
          sort: ['id:desc'],
          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coins?${query}`
      );

      let newData = {};
      let newArr = [];

      data.data.forEach((doc) => {
        newData = {
          id: doc.id,
          ...doc.attributes,
        };
        newArr.push(newData);
      });
      return newArr;
    },
    {
      initialData: data,
    }
  );

  return (
    <Layout name='wallet' desc='I-Predict User Wallet'>
      <NavHeader />
      <div className='mx-4'>
        <div
          data-aos='fade-left'
          data-aos-duration='1500'
          data-aos-easing='ease-out-back'
          className='text text-center my-5'
        >
          <Heading>My Wallet</Heading>
        </div>
        <WalletHomePage
          userDoc={userDoc}
          user={user}
          setUserDoc={setUserDoc}
          freshCoins={freshCoins}
        />
        {/* <NoWalletEmptyComponent /> */}
      </div>
    </Layout>
  );
};

export default UserWalletPage;

export async function getStaticProps() {
  const query = qs.stringify(
    {
      sort: ['id:desc'],
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coins?${query}`
  );

  let newData = {};
  let newArr = [];

  data.data.forEach((doc) => {
    newData = {
      id: doc.id,
      ...doc.attributes,
    };
    newArr.push(newData);
  });

  return {
    props: {
      data: newArr,
    },
    revalidate: 5,
  };
}
