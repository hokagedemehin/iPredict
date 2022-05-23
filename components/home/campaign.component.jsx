// import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Navigation, Autoplay, Keyboard, EffectFade } from 'swiper';

const CampaignComponent = ({ data }) => {
  // console.log(data);
  return (
    <div>
      <Swiper
        effect={'fade'}
        navigation={true}
        modules={[Navigation, Autoplay, Keyboard, EffectFade]}
        className='mySwiper'
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{
          enabled: true,
        }}
      >
        {data &&
          data?.data.map((advert, index) => (
            <SwiperSlide key={index}>
              <div className='bg-white relative'>
                {/* large screen image */}
                <div className='hidden h-[15rem] w-full sm:relative sm:block sm:h-[30rem]'>
                  <Image
                    src={advert?.attributes?.image}
                    layout='fill'
                    objectFit='contain'
                    placeholder='blur'
                    alt='Campaign Background'
                    blurDataURL={advert?.attributes?.image}
                  />
                  <div className='absolute inset-0 h-[15rem] w-full bg-white opacity-10 sm:h-[30rem]'></div>
                </div>
                {/* small screen image */}
                <div className='relative block h-[15rem] w-full sm:hidden sm:h-[30rem]'>
                  <Image
                    src={advert?.attributes?.image}
                    layout='fill'
                    objectFit='cover'
                    placeholder='blur'
                    alt='Campaign Background'
                    blurDataURL={advert?.attributes?.image}
                  />
                  <div className='inset absolute h-[15rem] w-full bg-white opacity-10 sm:h-[30rem]'></div>
                </div>
                {/* campaign link */}
                <div className='absolute sm:bottom-4 bottom-3 right-2'>
                  <div className=''>
                    <Link href={advert?.attributes?.link} passHref>
                      <a
                        target='_blank'
                        rel='noreferrer'
                        className='text-center text-white text-sm sm:text-xl font-bold px-4 py-1.5 sm:px-6 sm:py-2 bg-black rounded-full hover:bg-gray-800 transition duration-300 ease-in transform hover:scale-110'
                      >
                        {advert?.attributes?.buttonName}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CampaignComponent;
