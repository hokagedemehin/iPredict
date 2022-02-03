import { Button, Icon, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsCoin } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import { useQuery } from 'react-query';
import GetUserInfo from '../../utils/auth/getUserInfo';

// import CoinsComponent from './coins.component';
import CoinsComponentPayStack from './coins.paystack.component';

const WalletHomePage = ({ userDoc, user }) => {
  // const [userData, setUserData] = useState([]);
  // console.log('userData', userData);
  const walletData = [
    { id: 1, coins: 10, amount: 50, discount: '0', badge: 'discount1.png' },
    { id: 2, coins: 25, amount: 100, discount: '125', badge: 'discount1.png' },
    { id: 3, coins: 60, amount: 200, discount: '300', badge: 'discount1.png' },
    { id: 4, coins: 150, amount: 500, discount: '750', badge: 'discount1.png' },
    {
      id: 5,
      coins: 350,
      amount: 1000,
      discount: '1750',
      badge: 'discount1.png',
    },
    {
      id: 6,
      coins: 1800,
      amount: 5000,
      discount: '9000',
      badge: 'special1.png',
    },
  ];

  const [userInfo, setUserInfo] = useState([]);

  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    ['userInfo', user],
    async () => await GetUserInfo(user),
    { enabled: !!user }
  );
  useEffect(() => {
    if (
      isSuccess &&
      typeof (data !== null) &&
      Object?.keys(data).length !== 0
    ) {
      // const newArr = [];

      // data?.forEach((doc) => newArr.push(doc.data()));
      // if (newArr.length !== 0) {
      setUserInfo(data.data());
      // }
    }
  }, [isSuccess, dataUpdatedAt]);

  return (
    <div className=''>
      <div className='flex flex-col space-y-10 mb-5'>
        <div className='summary w-full bg-purple-700 ring-1 ring-gray-200 shadow-lg rounded-xl py-5 '>
          <div className='flex flex-col sm:flex-row space-y-5 sm:space-y-0 '>
            <div className='coins w-full flex justify-center items-center space-x-3'>
              <div className='flex flex-col text-white justify-center items-center text-lg sm:text-2xl'>
                <div>
                  <Text className=''>Coins</Text>
                </div>
                <div className='flex items-center gap-1 font-bold'>
                  <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
                  {isLoading ? (
                    <Skeleton>coins</Skeleton>
                  ) : isSuccess && userInfo.length !== 0 ? (
                    userInfo?.coins
                  ) : (
                    0
                  )}
                </div>
              </div>
              {/* <div>
                <Button>Buy Coins</Button>
              </div> */}
            </div>
            <div className='cash w-full flex items-center justify-center space-x-3'>
              <div className='flex flex-col justify-center items-center text-white text-lg sm:text-2xl'>
                <div>
                  <Text>Cash</Text>
                </div>
                <div className='flex items-center gap-1 font-bold'>
                  <Icon as={GiMoneyStack} className='' />
                  &#x20A6;
                  {isLoading ? (
                    <Skeleton>money</Skeleton>
                  ) : isSuccess && userInfo.length !== 0 ? (
                    userInfo?.money
                  ) : (
                    0
                  )}
                </div>
              </div>
              <div>
                <Button
                  isDisabled={userInfo?.money < 1000}
                  className='transform transition duration-200 ease-in hover:scale-105'
                >
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='buy w-full bg-purple-700 ring-1 ring-gray-200 shadow-lg rounded-xl py-5 px-2'>
          <div className='flex flex-wrap gap-4 justify-center items-center'>
            {walletData.map((data, index) => (
              <CoinsComponentPayStack
                key={index}
                data={data}
                userDoc={userDoc}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletHomePage;

/******<div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                25 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N100
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                60 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N200
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                150 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N500
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                350 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N1000
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                1800 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N5000
              </div>
            </div> */
