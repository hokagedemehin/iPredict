import { Image, Text } from '@chakra-ui/react';
import React from 'react';

const TriviaAttemptsEmptyComponent = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center space-y-5 mx-2 mb-4 mt-2'>
        <Image
          src='/emptycanvas/triviaquestions.png'
          borderRadius='md'
          boxSize={['200px', '300px', '400px']}
          objectFit='cover'
          alt='No news'
          fallbackSrc='https://via.placeholder.com/250?text=I-Predict'
        />
        <Text fontSize='lg' fontWeight='bold'>
          ❔ No Trivia attempts made ❓
        </Text>
      </div>
    </div>
  );
};

export default TriviaAttemptsEmptyComponent;
