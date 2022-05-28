// import axios from 'axios';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Navigation, Keyboard } from 'swiper';
import Image from 'next/image';
const FeaturedMagazine = ({ data }) => {
  return (
    <div>
      <Swiper
        navigation={true}
        modules={[Navigation, Keyboard]}
        className='mySwiper'
        loop={true}
        keyboard={{
          enabled: true,
        }}
      >
        {data &&
          data?.map((onePage, index) => (
            <SwiperSlide key={index}>
              <div className='relative bg-white'>
                {/* large screen image */}
                <div className='hidden h-[10rem] w-full sm:relative sm:block sm:h-[20rem]'>
                  <Image
                    src={onePage?.attributes?.cover}
                    layout='fill'
                    objectFit='contain'
                    placeholder='blur'
                    alt={onePage?.attributes?.name}
                    blurDataURL={onePage?.attributes?.cover}
                  />
                </div>
                {/* small screen image */}
                <div className='relative block h-[15rem] w-full sm:hidden sm:h-[20rem]'>
                  <Image
                    src={onePage?.attributes?.cover}
                    layout='fill'
                    objectFit='contain'
                    placeholder='blur'
                    alt={onePage?.attributes?.name}
                    blurDataURL={onePage?.attributes?.cover}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default FeaturedMagazine;
