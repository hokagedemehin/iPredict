import { Image, Text } from '@chakra-ui/react';
import React from 'react';

const TeamCardEmptyComponent = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center space-y-5 mx-2 mb-4 mt-2'>
        <Image
          src='/emptycanvas/teamcards.png'
          borderRadius='md'
          // boxSize='200px'
          alt='No news'
          fallbackSrc='https://via.placeholder.com/250?text=I-Predict'
        />
        <Text fontSize='lg' fontWeight='bold'>
          🃏 Team Cards not available 🃏
        </Text>
      </div>
    </div>
  );
};

export default TeamCardEmptyComponent;
