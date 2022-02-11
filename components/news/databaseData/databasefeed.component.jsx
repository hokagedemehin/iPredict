import {
  Box,
  // Heading,
  Image,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import NewsTransferEmptyComponent from '../../emptypages/newsandtransfer.empty';

const DatabaseFeedComponent = ({
  isSuccess,
  databaseLoading,
  footballNews,
  transferNews,
  uefaNews,
}) => {
  const router = useRouter();
  // console.log('Football :>> ', footballNews);
  // console.log('Transfer :>> ', transferNews);
  // console.log('UEFA :>> ', uefaNews);

  const handleClick = (e, section, id) => {
    e.preventDefault();
    router.push(`/news/${section}/${id}`);
  };

  // const timeofNews = moment(elem?.created_at).fromNow();

  // console.log(moment('2022-02-10T16:15:00+00:00').fromNow());
  // console.log(moment().format());

  const MotionDiv = motion(Box);

  return (
    <div className='flex w-full'>
      <Tabs variant='soft-rounded' colorScheme='teal'>
        <TabList>
          <Tab
            _selected={{ color: 'white', bg: 'purple.700' }}
            // className='text-white rounded-full font-bold'
          >
            Football
          </Tab>
          <Tab
            _selected={{ color: 'white', bg: 'purple.700' }}
            // className='text-white rounded-full font-bold'
          >
            Transfer
          </Tab>
          <Tab
            _selected={{ color: 'white', bg: 'purple.700' }}
            className='text-white rounded-full font-bold'
          >
            Uefa
          </Tab>
        </TabList>
        <TabPanels>
          {/* Football */}
          <TabPanel>
            <div className=' space-y-3'>
              {footballNews.length !== 0 &&
                footballNews.map((football, index) => (
                  <MotionDiv
                    key={index}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className='w-full cursor-pointer space-y-1 rounded-md p-3 shadow-md ring-1 ring-gray-200'
                    onClick={(e) =>
                      handleClick(e, football?.section, football?.docID)
                    }
                  >
                    <div className='flex space-x-3'>
                      <div className='flex '>
                        <Image
                          src={football?.image?.data?.urls?.uploaded?.embed}
                          borderRadius='xl'
                          // boxSize='20px'
                          // htmlWidth={[100, 200]}
                          // htmlHeight={150}
                          className='h-20 w-48 sm:h-28 sm:w-44'
                          fit='cover'
                          alt='No football news'
                          fallbackSrc='https://via.placeholder.com/250?text=I-Predict-News'
                        />
                      </div>
                      <div className='flex flex-col  justify-between  sm:w-[30rem]'>
                        <Text
                          // isTruncated
                          // size={['xs', 'md']}
                          // fontSize='xs'
                          className='text-xs font-bold sm:w-[25rem] sm:text-lg'
                        >
                          {football?.title}
                        </Text>
                        <Text
                          // fontSize='xs'
                          className='flex items-end justify-end text-xs font-bold sm:text-base'
                        >
                          {moment(football?.publishedAt).fromNow()}
                        </Text>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              {isSuccess && footballNews.length === 0 && (
                <NewsTransferEmptyComponent />
              )}
              {databaseLoading &&
                footballNews.length === 0 &&
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((elem) => (
                  <Skeleton className='h-10 w-full' key={elem}>
                    {elem}
                  </Skeleton>
                ))}
            </div>
          </TabPanel>
          {/* transfers */}
          <TabPanel>
            <div className='space-y-4'>
              {transferNews.length !== 0 &&
                transferNews.map((transfer, index) => (
                  <MotionDiv
                    key={index}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className='w-full cursor-pointer space-y-1 rounded-md p-3 shadow-md ring-1 ring-gray-200'
                    onClick={(e) =>
                      handleClick(e, transfer?.section, transfer?.docID)
                    }
                  >
                    <div className='flex space-x-3'>
                      <div className='flex '>
                        <Image
                          src={transfer?.image?.data?.urls?.uploaded?.embed}
                          borderRadius='xl'
                          // boxSize='20px'
                          // htmlWidth={[100, 200]}
                          // htmlHeight={150}
                          className='h-20 w-48 sm:h-28 sm:w-44'
                          objectFit='cover'
                          alt='No transfer news'
                          fallbackSrc='https://via.placeholder.com/250?text=I-Predict-News'
                        />
                      </div>
                      <div className='flex flex-col  justify-between  sm:w-[30rem]'>
                        <Text
                          // isTruncated
                          // size={['xs', 'md']}
                          // fontSize='xs'
                          className='text-xs font-bold sm:w-[25rem] sm:text-lg'
                        >
                          {transfer?.title}
                        </Text>
                        <Text
                          // fontSize='xs'
                          className='flex w-full items-end justify-end text-xs font-bold sm:text-base'
                        >
                          {moment(transfer?.publishedAt).fromNow()}
                        </Text>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              {isSuccess && transferNews.length === 0 && (
                <NewsTransferEmptyComponent />
              )}
              {databaseLoading &&
                transferNews.length === 0 &&
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((elem) => (
                  <Skeleton className='h-10 w-full' key={elem}>
                    {elem}
                  </Skeleton>
                ))}
            </div>
          </TabPanel>
          {/* uefa */}
          <TabPanel>
            <div className='space-y-3'>
              {uefaNews.length !== 0 &&
                uefaNews.map((uefa, index) => (
                  <MotionDiv
                    key={index}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className='w-fit cursor-pointer space-y-1 rounded-md p-3 shadow-md ring-1 ring-gray-200'
                    onClick={(e) => handleClick(e, uefa?.section, uefa?.docID)}
                  >
                    <div className='flex w-full space-x-3'>
                      <div className='flex '>
                        <Image
                          src={uefa?.image?.data?.urls?.uploaded?.embed}
                          borderRadius='xl'
                          // boxSize='20px'
                          // htmlWidth={[100, 200]}
                          // htmlHeight={150}
                          className='h-20 w-48 sm:h-28 sm:w-44'
                          objectFit='cover'
                          alt='No uefa news'
                          fallbackSrc='https://via.placeholder.com/250?text=I-Predict-News'
                        />
                      </div>
                      <div className='flex flex-col  justify-between sm:w-[30rem]'>
                        <Text
                          // isTruncated
                          // size={['xs', 'md']}
                          // fontSize='xs'
                          className='text-xs font-bold sm:w-[25rem] sm:text-lg'
                        >
                          {uefa?.title}
                        </Text>
                        <Text
                          // fontSize='xs'
                          className='flex w-full items-end justify-end text-xs font-bold sm:text-base'
                        >
                          {moment(uefa?.publishedAt).fromNow()}
                        </Text>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              {isSuccess && uefaNews.length === 0 && (
                <NewsTransferEmptyComponent />
              )}
              {databaseLoading &&
                uefaNews.length === 0 &&
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((elem) => (
                  <Skeleton className='h-10 w-full' key={elem}>
                    {elem}
                  </Skeleton>
                ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default DatabaseFeedComponent;

/**
 *  <div className='flex'>
                      <Image
                        src='/emptycanvas/newstransfer.png'
                        borderRadius='md'
                        boxSize='50px'
                        objectFit='cover'
                        alt='No news'
                        fallbackSrc='https://via.placeholder.com/250?text=I-Predict'
                      />
                      <Heading size={['xs', 'md']} className=''>
                        {football?.title}
                      </Heading>
                      <Text className='flex justify-end '>
                        {moment(football?.publishedAt).fromNow()}
                      </Text>
                    </div>
 */
