import { Skeleton } from '@chakra-ui/react';
import React from 'react';

const TriviaSkeletonAttempts = () => {
  return (
    <div className='flex m-2 '>
      <Skeleton className='w-40 h-44'>Loading</Skeleton>
    </div>
  );
};

export default TriviaSkeletonAttempts;
