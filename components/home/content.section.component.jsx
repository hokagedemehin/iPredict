import React from 'react';
import {
  GiSoccerBall,
  GiCardPlay,
  GiCartwheel,
  GiNewspaper,
} from 'react-icons/gi';
import { BsNewspaper } from 'react-icons/bs';
import { MdOutlineQuiz } from 'react-icons/md';
import { Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { LinkBox, LinkOverlay } from "@chakra-ui/react";

const ContentComponent = () => {
  const router = useRouter();
  return (
    <div className='pt-16'>
      <div className='grid sm:grid-cols-3 grid-cols-2 gap-4 mx-4'>
        <div
          onClick={() => router.push('/predictandwin')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700 '
        >
          <Icon as={GiSoccerBall} w={10} h={10} />

          <p className='text-sm font-bold text-center'>Predict & Win</p>
        </div>

        <div
          onClick={() => router.push('/news')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={BsNewspaper} w={10} h={10} />
          <p className='text-sm font-bold text-center'>News & Transfer</p>
        </div>

        <div
          onClick={() => router.push('/teamcard')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={GiCardPlay} w={10} h={10} />
          <p className='text-sm font-bold text-center'>Team Cards</p>
        </div>
        <div
          onClick={() => router.push('/triviagame')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={MdOutlineQuiz} w={10} h={10} />
          <p className='text-sm font-bold text-center'>Trivia Game</p>
        </div>

        <div
          onClick={() => router.push('/spinmatch')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={GiCartwheel} w={10} h={10} />
          <p className='text-sm font-bold text-center'>Spin Match Virtual</p>
        </div>
        <div
          onClick={() => router.push('/magazine')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={GiNewspaper} w={10} h={10} />
          <p className='text-sm font-bold text-center'>News Magazine</p>
        </div>
      </div>
    </div>
  );
};

export default ContentComponent;
