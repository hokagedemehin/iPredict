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
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import NewsTransferEmptyComponent from '../../emptypages/newsandtransfer.empty';
import ReactPaginate from 'react-paginate';

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
  const [footballCount, setFootballCount] = useState(0);
  const [transferCount, setTransferCount] = useState(0);
  const [uefaCount, setUefaCount] = useState(0);

  const [footballOffset, setFootballOffset] = useState(0);
  const [transferOffset, setTransferOffset] = useState(0);
  const [uefaOffset, setUefaOffset] = useState(0);

  const [footballItems, setFootballItems] = useState([]);
  const [transferItems, setTransferItems] = useState([]);
  const [uefaItems, setUefaItems] = useState([]);

  const [itemsPerPage] = useState(4);
  const handleClick = (e, section, id) => {
    e.preventDefault();
    router.push(`/news/${section}/${id}`);
  };

  useEffect(() => {
    // if (trivia.length !== 0) {
    const footballEndOffset = footballOffset + itemsPerPage;
    setFootballItems(footballNews.slice(footballOffset, footballEndOffset));

    setFootballCount(Math.ceil(footballNews.length / itemsPerPage));

    // }
  }, [footballOffset, itemsPerPage, footballNews]);
  const handlePageClickFootball = (event) => {
    const newOffset = (event.selected * itemsPerPage) % footballNews.length;
    setFootballOffset(newOffset);
  };

  useEffect(() => {
    // if (trivia.length !== 0) {
    const transferEndOffset = transferOffset + itemsPerPage;

    setTransferItems(transferNews.slice(transferOffset, transferEndOffset));

    setTransferCount(Math.ceil(transferNews.length / itemsPerPage));

    // }
  }, [transferOffset, itemsPerPage, transferNews]);

  const handlePageClickTransfer = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transferNews.length;
    setTransferOffset(newOffset);
  };

  useEffect(() => {
    // if (trivia.length !== 0) {
    const uefaEndOffset = uefaOffset + itemsPerPage;

    setUefaItems(uefaNews.slice(uefaOffset, uefaEndOffset));

    setUefaCount(Math.ceil(uefaNews.length / itemsPerPage));
    // }
  }, [uefaOffset, itemsPerPage, uefaNews]);

  const handlePageClickUefa = (event) => {
    const newOffset = (event.selected * itemsPerPage) % uefaNews.length;
    setUefaOffset(newOffset);
  };

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
                footballItems.length !== 0 &&
                footballItems.map((football, index) => (
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
            <div className=' pt-5 max-w-xs sm:max-w-sm mx-auto w-full'>
              {footballNews.length !== 0 && footballItems.length !== 0 && (
                <ReactPaginate
                  className='flex max-w-sm mx-auto w-full justify-center items-center space-x-4 ring-1 ring-gray-300 shadow-md py-2 px-4 rounded-lg'
                  breakLabel='...'
                  breakClassName='text-xl sm:text-3xl font-bold'
                  nextLabel='▶'
                  previousLabel='◀'
                  marginPagesDisplayed={1}
                  onPageChange={handlePageClickFootball}
                  pageRangeDisplayed={1}
                  pageCount={footballCount}
                  renderOnZeroPageCount={null}
                  pageClassName=' px-2 font-semibold sm:text-2xl ring-1 ring-white rounded-md'
                  activeClassName='bg-gray-200 text-black'
                  previousClassName='text-xl sm:text-2xl'
                  nextClassName='text-xl sm:text-2xl'
                  // disabledClassName='disabled:opacity-50'
                />
              )}
            </div>
          </TabPanel>
          {/* transfers */}
          <TabPanel>
            <div className='space-y-4'>
              {transferNews.length !== 0 &&
                transferItems.length !== 0 &&
                transferItems.map((transfer, index) => (
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
            <div className=' pt-5 max-w-xs sm:max-w-sm mx-auto w-full'>
              {transferNews.length !== 0 && transferItems.length !== 0 && (
                <ReactPaginate
                  className='flex max-w-sm mx-auto w-full justify-center items-center space-x-4 ring-1 ring-gray-300 shadow-md py-2 px-4 rounded-lg'
                  breakLabel='...'
                  breakClassName='text-xl sm:text-3xl font-bold'
                  nextLabel='▶'
                  previousLabel='◀'
                  marginPagesDisplayed={1}
                  onPageChange={handlePageClickTransfer}
                  pageRangeDisplayed={1}
                  pageCount={transferCount}
                  renderOnZeroPageCount={null}
                  pageClassName=' px-2 font-semibold sm:text-2xl ring-1 ring-white rounded-md'
                  activeClassName='bg-gray-200 text-black'
                  previousClassName='text-xl sm:text-2xl'
                  nextClassName='text-xl sm:text-2xl'
                  // disabledClassName='disabled:opacity-50'
                />
              )}
            </div>
          </TabPanel>
          {/* uefa */}
          <TabPanel>
            <div className='space-y-3'>
              {uefaNews.length !== 0 &&
                uefaItems.length !== 0 &&
                uefaItems.map((uefa, index) => (
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

            <div className=' pt-5 max-w-xs sm:max-w-sm mx-auto w-full'>
              {uefaNews.length !== 0 && uefaItems.length !== 0 && (
                <ReactPaginate
                  className='flex max-w-sm mx-auto w-full justify-center items-center space-x-4 ring-1 ring-gray-300 shadow-md py-2 px-4 rounded-lg'
                  breakLabel='...'
                  breakClassName='text-xl sm:text-3xl font-bold'
                  nextLabel='▶'
                  previousLabel='◀'
                  marginPagesDisplayed={1}
                  onPageChange={handlePageClickUefa}
                  pageRangeDisplayed={1}
                  pageCount={uefaCount}
                  renderOnZeroPageCount={null}
                  pageClassName=' px-2 font-semibold sm:text-2xl ring-1 ring-white rounded-md'
                  activeClassName='bg-gray-200 text-black'
                  previousClassName='text-xl sm:text-2xl'
                  nextClassName='text-xl sm:text-2xl'
                  // disabledClassName='disabled:opacity-50'
                />
              )}
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
