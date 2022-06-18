import { Button, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const NoTeamCardEmptyComponent = () => {
  const router = useRouter();
  return (
    <div>
      <div className='flex flex-col items-center justify-center space-y-5 mx-2 mb-4 mt-2'>
        <Image
          src='/emptycanvas/teamcards.png'
          borderRadius='md'
          boxSize={['200px', '300px', '400px']}
          objectFit='cover'
          alt='No news'
          fallbackSrc='https://via.placeholder.com/250?text=I-Predict'
        />
        <Text fontSize='xl' fontWeight='bold'>
          No team cards yet 🃏
        </Text>
        <Button colorScheme='teal' onClick={() => router.push('/teamcard/buy')}>
          Get A Card Now
        </Button>
      </div>
    </div>
  );
};

export default NoTeamCardEmptyComponent;
