import { Button, Heading } from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Navigation, Keyboard } from 'swiper';
import { useUser } from '../../../utils/auth/userContext';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { useQuery } from 'react-query';
import moment from 'moment';
const qs = require('qs');

const AllMagazinePages = ({ data: allMags }) => {
  const router = useRouter();
  const { user, userDoc } = useUser();
  console.log('router :>> ', router);
  // console.log('allMags :>> ', allMags);

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

  const getNow = moment().format();
  useEffect(async () => {
    if (
      isSuccess &&
      subs?.length > 0 &&
      subs[0]?.attributes?.duration < getNow
    ) {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriptions/${subs[0]?.id}`,
        {
          data: {
            active: false,
          },
        }
      );
      router.push('/magazine');
    } else if (isSuccess && subs?.length == 0) {
      router.push('/magazine');
    }
  }, [subs, isSuccess, dataUpdatedAt]);
  return (
    <Layout name='View Magazine' desc='See all Pages of a particular magazine'>
      <NavHeader />
      <div className='mx-2 pb-7'>
        <div className='flex w-full items-center justify-center '>
          <div className='mb-5 w-full text-center'>
            <div className='mx-4 flex w-full'>
              <Button
                leftIcon={<BiArrowBack />}
                variant='ghost'
                onClick={() => router.push('/magazine')}
              >
                Back
              </Button>
            </div>
            <Heading>{allMags[0].attributes?.name}</Heading>
          </div>
        </div>
        <Swiper
          // effect={'fade'}
          navigation={true}
          modules={[Navigation, Keyboard]}
          className='mySwiper'
          loop={true}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          //   pauseOnMouseEnter: true,
          // }}
          keyboard={{
            enabled: true,
          }}
        >
          {allMags &&
            allMags?.map((onePage, index) => (
              <SwiperSlide key={index}>
                <div className='relative bg-white'>
                  {/* large screen image */}
                  <div className='hidden h-[25rem] w-full sm:relative sm:block sm:h-[35rem]'>
                    <Image
                      src={onePage?.attributes?.imageURL}
                      layout='fill'
                      objectFit='contain'
                      placeholder='blur'
                      alt={onePage?.attributes?.page}
                      blurDataURL={onePage?.attributes?.imageURL}
                    />
                  </div>
                  {/* small screen image */}
                  <div className='relative block h-[25rem] w-full sm:hidden sm:h-[35rem]'>
                    <Image
                      src={onePage?.attributes?.imageURL}
                      layout='fill'
                      objectFit='contain'
                      placeholder='blur'
                      alt={onePage?.attributes?.page}
                      blurDataURL={onePage?.attributes?.imageURL}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Layout>
  );
};

export default AllMagazinePages;

export async function getServerSideProps({ params }) {
  // console.log('params :>> ', params);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/magazines/${params.name}?populate=*`
  );
  return {
    props: {
      data: data?.data?.attributes?.magazine_pages?.data,
    },
  };
}
