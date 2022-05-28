import {
  // Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  // DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Navigation, Keyboard } from 'swiper';
import Image from 'next/image';

const PreviewMagazine = ({ isOpen, onClose, btnRef, data }) => {
  // console.log('data :>> ', data);
  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{data[0]?.attributes?.name}</DrawerHeader>

          <DrawerBody>
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
                      <div className='hidden h-[30rem] w-full sm:relative sm:block sm:h-[50rem]'>
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
                      <div className='relative block h-[30rem] w-full sm:hidden sm:h-[50rem]'>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PreviewMagazine;
