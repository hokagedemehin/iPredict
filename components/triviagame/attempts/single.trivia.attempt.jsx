import { Icon, Text } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import { MdOutlineClose } from 'react-icons/md';
import { CheckIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { BsFillPatchCheckFill } from 'react-icons/bs';

const SingleTriviaAttemptComponent = ({ attempt, userDoc }) => {
  // console.log(userDoc);
  const dateAttempt = moment(attempt?.createdAt.toDate()).format(
    'MMM Do YY, h:mm:ss a'
  );
  // const dateAttempt = moment(attempt?.createdAt.toDate()).fromNow();
  return (
    <div>
      <div className='flex w-full'>
        <div className='w-full h-fit px-2 py-4 ring-1 ring-gray-200 shadow-md mx-2 my-2 space-y-2 rounded-lg'>
          {/* Name of User */}
          <div className='name flex justify-between items-center'>
            <div className='flex flex-col -space-y-1'>
              <Text fontSize='lg'>{userDoc?.firstName}</Text>
              <Text fontSize='lg'>{userDoc?.lastName}</Text>
            </div>
            {attempt.correctAnswers == 10 && (
              <Icon as={BsFillPatchCheckFill} color='green.500' boxSize={7} />
            )}
          </div>
          {/* Date of attempts */}
          <div className='date'>
            <Text fontSize='xs' className='font-bold text-gray-400'>
              {dateAttempt}
            </Text>
          </div>
          {/* Result */}
          <div className='flex flex-col'>
            <div className='question'>
              <Text fontSize='sm'>
                {' '}
                <QuestionOutlineIcon color='gray.500' boxSize={3} />{' '}
                {attempt?.noOfQuestions} Questions
              </Text>
              <Text fontSize='sm'>
                {' '}
                <CheckIcon color='green.500' boxSize={3} />{' '}
                {attempt?.correctAnswers} Right Answer
              </Text>
              <Text fontSize='sm'>
                <Icon as={MdOutlineClose} color='red.500' boxSize={3} />{' '}
                {attempt?.wrongAnswers} Wrong Answers
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTriviaAttemptComponent;
