import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Image, Square } from '@chakra-ui/react';
const HeroComponent = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos='fade-left'
      data-aos-duration='1500'
      data-aos-easing='ease-out-back'
      className=''
    >
      <Square my='8'>
        <Image
          w='120px'
          // objectFit="cover"
          src='/logo/ipredict.png'
          alt='I-Pedict'
        />
      </Square>
    </div>
  );
};

export default HeroComponent;
