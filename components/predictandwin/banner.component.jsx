import { Heading, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import GetBanner from '../../utils/prediction/getBanner';

const BannerPredictAndWin = () => {
  const { isLoading, data, isSuccess } = useQuery(
    'prize-people',
    async () => await GetBanner()
  );

  return (
    <div>
      <div className='flex flex-col px-5 sm:px-10 py-5 bg-gradient-to-r from-purple-700 to-blue-600 text-center max-w-sm mx-auto rounded-lg shadow-md mb-10 text-white'>
        <Text className='font-semibold'>This week chance of winning</Text>
        {isLoading && <Skeleton className='h-10 '>Input Value</Skeleton>}
        {isSuccess && (
          <Heading className=''>&#x20A6;{data?.prize ?? '20,000'}</Heading>
        )}
        {isLoading && <Skeleton className='h-5 mt-2 '>Input Value</Skeleton>}
        {isSuccess && (
          <Text className='text-[9px]'>
            First {data?.people ?? '10'} people to get the correct scores share
            the price above.
          </Text>
        )}
        <Text fontSize='xs' className='mt-3 font-bold'>
          PREDICT ALL MATCHES CORRECTLY
        </Text>
      </div>
    </div>
  );
};

export default BannerPredictAndWin;
