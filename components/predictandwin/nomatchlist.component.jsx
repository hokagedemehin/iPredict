import { Image, Text } from '@chakra-ui/react';
import React from 'react';

const NoMatchListComponent = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-5 mx-2 mb-4 mt-2'>
      <Image
        src='/predictandwin/nomatches.png'
        borderRadius='md'
        boxSize={['200px', '300px', '400px']}
        alt='No matches selected'
        fallbackSrc='https://via.placeholder.com/200'
      />
      <Text fontSize='lg' fontWeight='bold'>
        New matches are coming soon
      </Text>
    </div>
  );
};

export default NoMatchListComponent;
