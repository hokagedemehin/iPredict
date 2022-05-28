import { Heading, Text, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/userContext';
import moment from 'moment';
import axios from 'axios';
const qs = require('qs');
import DeductCoinsFromWallet from '../../utils/wallet/deductCoinsFromWallet';
import SetUserHistory from '../../utils/wallet/setUserHistory';
const MagazinePage = () => {
  const { user, userDoc, setUserDoc } = useUser();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    if (router?.components['/magazine'] === undefined) {
      router.push('/magazine');
    }
  }, []);

  const handleSubmit = async (sub, coins) => {
    if (userDoc?.coins < coins) {
      toast({
        title: 'Not enough coins',
        description: `You need ${
          coins - userDoc?.coins
        } more coins to subscribe`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      await DeductCoinsFromWallet(coins, userDoc, setUserDoc);
      const newData = {
        coins: coins,
        money: 0,
        activity: '',
        type: 'Magazine Subscription',
      };

      await SetUserHistory(userDoc, newData);
      const query = qs.stringify(
        {
          filters: {
            email: {
              $eq: userDoc?.email,
            },
            active: {
              $eq: true,
            },
          },
          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data: activeSubs } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriptions?${query}`
      );
      // console.log('activeSubs', activeSubs);
      if (activeSubs?.data.length > 0) {
        activeSubs?.data.forEach(async (sub) => {
          await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriptions/${sub.id}`,
            {
              data: {
                active: false,
              },
            }
          );
        });
      }
      const date = moment().add(sub, 'months').format();
      // const date = moment().add(sub, 'months').calendar();
      // console.log('date :>> ', date);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriptions`,
        {
          data: {
            // durationDate: date,
            duration: date,
            firstName: userDoc?.firstName,
            lastName: userDoc?.lastName,
            email: userDoc?.email,
            active: true,
            user_profile: [userDoc?.id],
          },
        }
      );
      toast({
        title: 'Subscription Successful',
        description: `You have successfully subscribed to all magazine for ${sub} months`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/magazine');
    }
  };

  return (
    <Layout name='magazine' desc='I-predict Magazine'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text text-center my-5'>
          <Heading>Exclusive Offer for you!</Heading>
        </div>
        <div className='space-y-7 font-bold text-green-500 text-center mb-10'>
          <Text>Go premium and get all-access to every magazine!!!</Text>
        </div>
        <div className='my-6'>
          <div className='flex md:flex-row flex-col justify-center items-center space-y-4 md:space-y-0'>
            {/* 1 month */}
            <div className='border shadow-md pt-14 px-6 rounded-2xl bg-gray-100 md:-mr-2'>
              <Text className='font-bold text-xl text-gray-400'>1 Month</Text>
              <Text className='font-bold text-3xl pb-6 text-gray-500'>
                60 coins
              </Text>
              <div className='space-y-2 pb-10 text-gray-400'>
                <Text>- Access to all magazine</Text>
                <Text>- Personal & commercial use</Text>
              </div>

              <div
                onClick={() => handleSubmit(1, 60)}
                className='flex justify-center items-center space-x-3 px-5 py-2 border border-emerald-500 hover:text-white rounded-md bg-white cursor-pointer hover:bg-emerald-500 transition duration-300 ease-in mb-6'
              >
                <Text className='font-semibold'>Pay with wallet</Text>
              </div>
            </div>
            {/* 1 year */}
            <div className='border shadow-lg pt-14 pb-8 px-6 rounded-2xl text-white z-10 border-emerald-500 bg-blue-700'>
              <Text className='font-bold text-xl'>1 Year</Text>
              <Text className='font-bold text-3xl pb-6'>300 coins</Text>
              <div className='space-y-2 pb-10'>
                <Text>- Access to all magazine</Text>
                <Text>- Personal & commercial use</Text>
                <Text>- Pay once for a year</Text>
              </div>
              <div
                onClick={() => handleSubmit(12, 300)}
                className='flex justify-center items-center space-x-3 px-5 py-2 border border-white text-white bg-emerald-600 rounded-md shadow-md cursor-pointer hover:bg-emerald-800 transition duration-300 ease-in mb-6'
              >
                <Text className='font-semibold'>Pay with wallet</Text>
              </div>
            </div>
            {/* 6 months */}
            <div className='border shadow-md pt-14 px-6 rounded-2xl bg-gray-100 md:-ml-2'>
              <Text className='font-bold text-xl text-gray-400'>6 Month</Text>
              <Text className='font-bold text-3xl pb-6 text-gray-500'>
                120 coins
              </Text>
              <div className=' pb-10 text-gray-400'>
                <Text>- Access to all magazine</Text>
                <Text>- Personal & commercial use</Text>
                <Text>- Lower monthly price</Text>
              </div>

              <div
                onClick={() => handleSubmit(6, 120)}
                className='flex justify-center items-center space-x-3 px-5 py-2 border border-emerald-500 hover:text-white rounded-md cursor-pointer hover:bg-emerald-500 transition duration-300 ease-in mb-6 bg-white'
              >
                <Text className='font-semibold'>Pay with wallet</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MagazinePage;
