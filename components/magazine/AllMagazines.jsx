import { Search2Icon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TiNews } from 'react-icons/ti';
import { GiTwoCoins } from 'react-icons/gi';
import no_magazine from '../../public/magazine/no_magazine.png';
import { useRouter } from 'next/router';
import PreviewMagazine from './PreviewMagazine';
import { useQuery } from 'react-query';
import { useUser } from '../../utils/auth/userContext';
import axios from 'axios';
const qs = require('qs');

const AllMagazines = ({ data }) => {
  const { userDoc } = useUser();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [newData, setNewData] = useState(data);
  const [previewData, setPreviewData] = useState([]);
  const [active, setActive] = useState(false);
  // console.log('active', active);
  // * Get Subscriptions
  const {
    data: subs,
    isSuccess,
    dataUpdatedAt,
  } = useQuery(
    ['subscriptions', userDoc?.email],
    async () => {
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
      return activeSubs?.data;
    },
    { enabled: !!userDoc?.email }
  );
  // console.log('subs :>> ', subs);
  const getNow = moment().format();
  // console.log('getNow :>> ', getNow);
  if (subs) {
    // console.log('expired: ', getNow > subs[0]?.attributes?.duration);
  }
  // console.log('newData', newData);
  // console.log('previewData :>> ', previewData);

  useEffect(async () => {
    // console.log('fired');
    if (
      isSuccess &&
      subs?.length > 0 &&
      subs[0]?.attributes?.duration > getNow
    ) {
      setActive(true);
    } else if (
      isSuccess &&
      subs?.length > 0 &&
      subs[0]?.attributes?.duration < getNow
    ) {
      setActive(false);
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriptions/${subs[0]?.id}`,
        {
          data: {
            active: false,
          },
        }
      );
    } else {
      setActive(false);
    }
  }, [subs, isSuccess, dataUpdatedAt]);

  let data1 = [];
  const handleSearch = (e) => {
    let searchValue = e.target.value;
    data1 = data.filter((val) => {
      if (searchValue == '' || searchValue.length === 0) {
        return val;
      } else if (
        val?.attributes?.name &&
        val?.attributes?.name.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return val;
      }
    });
    // shuffle(data1);
    setNewData(data1);
  };
  const handlePreview = (magazine) => {
    const newData = magazine.slice(0, 3);
    setPreviewData(newData);
    onOpen();
  };

  return (
    <div>
      {/* SUbscription button */}
      {newData.length !== 0 && (
        <div>
          {!active && (
            <div
              data-aos='flip-up'
              data-aos-duration='1500'
              data-aos-easing='ease-out-back'
              data-aos-delay='1000'
              className='flex justify-center'
            >
              <div className='text-center font-black text-lg md:text-2xl m-4 p-4 shadow-md rounded-lg w-fit space-y-2 border'>
                <Text>Unlimited Access to the titles available</Text>
                <Button
                  onClick={() => router.push('/magazine/subscriptions')}
                  colorScheme='blue'
                  rightIcon={<GiTwoCoins />}
                  variant='solid'
                >
                  View Subscription Plans
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* search section */}
      <div className='flex justify-center sm:justify-end mb-7 mt-5'>
        <div>
          <InputGroup>
            <Input
              type='search'
              name='searchMag'
              id='searchMag'
              placeholder='Search Magazines Titles'
              onChange={handleSearch}
            />
            <InputRightElement children={<Search2Icon color='gray.300' />} />
          </InputGroup>
        </div>
      </div>
      {/* magazine list */}
      <div className='flex flex-wrap gap-4 justify-center'>
        {newData &&
          newData.map((mag, index) => (
            <div
              data-aos='fade-up'
              data-aos-duration='1500'
              data-aos-easing='ease-out-back'
              data-aos-delay={50 * index}
              key={index}
              className='flex sm:flex-row flex-col items-center sm:space-x-4 w-fit border shadow-lg p-3 rounded-lg'
            >
              {/* image */}
              <div className='relative w-[8rem] sm:w-[10rem] h-[10rem] sm:h-[15rem] mb-4 sm:mb-0'>
                <Image
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  src={mag?.attributes?.cover}
                  alt={mag?.attributes?.name}
                  blurDataURL={mag?.attributes?.cover}
                />
              </div>
              {/* description */}
              <div className='flex flex-col space-y-2 sm:space-y-3 '>
                <div className='text-base sm:text-xl font-bold'>
                  {mag?.attributes?.name}
                </div>
                <div className='text-xs sm:text-sm font-medium text-gray-400'>
                  {moment(mag?.attributes?.createdAt).format('MMM Do YYYY')}
                </div>
                <div className='flex'>
                  <div
                    ref={btnRef}
                    onClick={() =>
                      handlePreview(mag?.attributes?.magazine_pages?.data)
                    }
                    className='flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-300 cursor-pointer transition duration-300 ease-in rounded-md px-2 py-1 sm:px-3 sm:py-2'
                  >
                    <Text className='text-sm sm:text-lg '>Preview</Text>
                    <ViewIcon className='text-xs sm:text-base' />
                  </div>
                  {/* <Button size='sm' rightIcon={<ViewIcon />}>
                Preview
              </Button> */}
                </div>{' '}
                {active && (
                  <div className='flex'>
                    {/* <Button colorScheme='green' rightIcon={<TiNews />}>
                Read
              </Button> */}
                    <div
                      onClick={() => router.push(`/magazine/view/${mag?.id}`)}
                      className='flex justify-center items-center space-x-2 text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition duration-300 ease-in rounded-md px-3 py-1 sm:px-4 sm:py-2'
                    >
                      <Text className='text-sm sm:text-lg '>Read</Text>
                      <TiNews className='text-xs sm:text-base' />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        {/* no magazine */}
        {newData.length === 0 && (
          <div className='flex flex-col'>
            <div className='relative flex h-[15rem] w-[15rem]'>
              <Image
                src={no_magazine}
                layout='fill'
                objectFit='contain'
                placeholder='blur'
                alt='Empty Search'
                className=''
              />
            </div>
            <Text className='text-center text-xl font-bold'>No Magazine</Text>
          </div>
        )}
      </div>
      {/* preview modal */}
      <PreviewMagazine
        isOpen={isOpen}
        onClose={onClose}
        data={previewData}
        btnRef={btnRef}
      />
    </div>
  );
};

export default AllMagazines;
