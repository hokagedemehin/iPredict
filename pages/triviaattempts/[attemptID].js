import { Button, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../utils/auth/userContext';
import NavHeader from '../../components/nav/header.component';
import Layout from '../../components/layout/layout';

import AttemptedQuestionsPageComponent from '../../components/triviagame/attempts/attempted.questions';
import { useQuery } from 'react-query';
import GetOneAttemptQuestions from '../../utils/trivia/attempts/getOneAttempt';
import { ArrowBackIcon } from '@chakra-ui/icons';

const TriviaGamesPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { attemptID } = router.query;
  const email = user?.email;
  const [question, setQuestion] = useState([]);

  const { isLoading, data, isSuccess } = useQuery(
    ['attempted-questions', attemptID, email],
    async () => await GetOneAttemptQuestions(attemptID, email),
    { enabled: !![attemptID, email] }
  );
  // console.log(router.query);
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      const newArr = [];

      data?.forEach((doc) => newArr.push(doc.data()));

      setQuestion(newArr);
    }
  }, [isSuccess]);

  return (
    <Layout name='trivia-attempts' desc='I-Predict Trivia Attempts'>
      <NavHeader />
      <div className=''>
        <div className='flex my-2 max-w-xl mx-auto'>
          <Button
            variant='link'
            leftIcon={<ArrowBackIcon />}
            onClick={() => router.push('/triviaattempts')}
            className='mx-4 sm:mx-0'
          >
            Back
          </Button>
        </div>
        <div className='text text-center my-5'>
          <Heading size='md'>Attempted Questions</Heading>
        </div>
        <div className='space-y-4 max-w-xl mx-auto'>
          {isLoading &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((ques, index) => (
              <Skeleton key={index} className='rounded-lg'>
                <div className='flex p-3 shadow-md  '>
                  <Text isTruncated fontSize='lg'>
                    {ques}
                  </Text>
                </div>
              </Skeleton>
            ))}
        </div>
        <div className=' space-y-2 max-w-xl mx-auto'>
          {isSuccess &&
            question.map((ques, index) => (
              <AttemptedQuestionsPageComponent
                ques={ques}
                key={ques?.ID}
                index={index}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default TriviaGamesPage;
