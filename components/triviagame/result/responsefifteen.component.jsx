import { Button, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const FifteenResponse = ({ figures }) => {
  const router = useRouter();
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div>
      {figures.noOfQuestions == 15 && figures.correctAnswers == 15 && (
        <div className='flex flex-col justify-center'>
          <Heading className=' mt-4 text-center text-green-700'>
            Congratulations 🎉🎉
          </Heading>
          <Text className='text-center text-xl font-bold mt-4'>
            You Won !!!
          </Text>
          <Heading className='text-center'>&#x20A6;{figures.price}</Heading>
          <Button
            fontSize='lg'
            variant='outline'
            colorScheme='teal'
            onClick={(e) => {
              handleClick(e, `/triviagame`);
            }}
          >
            Win Again
          </Button>
        </div>
      )}
      {figures.noOfQuestions == 15 &&
        figures.correctAnswers < 15 &&
        figures.correctAnswers > 10 && (
          <div className='flex flex-col justify-center'>
            <Heading className=' mt-4 text-center text-green-700'>
              So Close 🤏🏾🤏🏾
            </Heading>
            <Text className='text-center text-xl font-bold mt-4 mb-2'>
              Give it Another shot !!!
            </Text>
            <Button
              fontSize='lg'
              variant='outline'
              colorScheme='teal'
              onClick={(e) => {
                handleClick(e, `/triviagame`);
              }}
            >
              Choose Category
            </Button>
          </div>
        )}
      {figures.noOfQuestions == 15 &&
        figures.correctAnswers < 11 &&
        figures.correctAnswers > 4 && (
          <div className='flex flex-col justify-center'>
            <Heading className=' mt-4 text-center text-green-700'>
              Great Attempt 👏🏾👏🏾
            </Heading>
            <Text className='text-center text-xl font-bold mt-4 mb-2'>
              Try Again !!!
            </Text>
            <Button
              fontSize='lg'
              variant='outline'
              colorScheme='teal'
              onClick={(e) => {
                handleClick(e, `/triviagame`);
              }}
            >
              Choose Category
            </Button>
          </div>
        )}
      {figures.noOfQuestions == 15 && figures.correctAnswers < 5 && (
        <div className='flex flex-col justify-center'>
          <Heading className=' mt-4 text-center text-green-700'>
            Nice Try 💪🏾💪🏾
          </Heading>
          <Text className='text-center text-xl font-bold mt-4 mb-2'>
            Go Again !!!
          </Text>

          <Button
            fontSize='lg'
            variant='outline'
            colorScheme='green'
            onClick={(e) => {
              handleClick(e, `/triviagame`);
            }}
          >
            Choose Category
          </Button>
        </div>
      )}
    </div>
  );
};

export default FifteenResponse;
