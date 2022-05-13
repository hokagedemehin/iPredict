import { Image, Text } from '@chakra-ui/react';
import React from 'react';

const HistoryEmptyComponent = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center space-y-5 mx-2 mb-4 mt-2'>
        <Image
          src='/emptycanvas/newsmagazine.png'
          borderRadius='md'
          boxSize={['100px', '150px', '200px']}
          // boxSize='200px'
          objectFit='cover'
          alt='No news'
          fallbackSrc='https://via.placeholder.com/250?text=I-Predict'
        />
        <Text fontSize='xl' fontWeight='bold' className='text-white'>
          No Activity Yet 🕵🏽‍♀️
        </Text>
      </div>
    </div>
  );
};

export default HistoryEmptyComponent;
