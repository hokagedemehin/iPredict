import React, { useState } from 'react';

// import { useRouter } from "next/router";

// import { useUser } from "../../../services/context/userContext";
// import moment from "moment";
import PaginationComp from './pagination.component';
import OneQuestion from './onequestion.component';
import { Button, Heading } from '@chakra-ui/react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import AddQuestionsToFirestore from '../../utils/trivia/addQuestionsToFirestore';
import { useUser } from '../../utils/auth/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TriviaQuizComponent = ({ data }) => {
  const router = useRouter();
  const { user } = useUser();

  const newArr = [];

  console.log('data: ', data);

  const [currentPage, setCurrentPage] = useState(1);
  const [questionPerPage] = useState(1);
  const [res, setRes] = useState([]);

  console.log('res: ', res);

  const handleChange = (value) => {
    setCurrentPage(currentPage + value);
  };

  const handleSubmit = async () => {
    for (const [key, value] of Object.entries(res)) {
      const ans = data.filter((val) => val.ID === key);
      ans.response = value;
      newArr.push(...ans);
      console.log('newArr: ', newArr);
    }
    await AddQuestionsToFirestore(newArr, user?.email);
  };

  const indexOfLastQuestion = currentPage * questionPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionPerPage;
  const currentQuestions = data?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const updateQuestion = (value) => {
    // get the question that is being answered
    currentQuestions[0].response = value;
    const id = currentQuestions[0].ID;
    const news = { [id]: value };
    setRes({ ...res, ...news });
  };

  const count = data.length;

  return (
    <div className=''>
      <div className='flex'>
        <div className='flex flex-col w-72'>
          <div>
            <Button
              variant='link'
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/triviagame')}
            >
              Back
            </Button>
          </div>
          <div className='flex justify-between items-center'>
            <Heading className='my-5'>Question {currentPage}</Heading>
            <CountdownCircleTimer
              isPlaying
              strokeWidth={5}
              size={50}
              duration={10}
              colors={['#004777', '#F7B801', '#A30000']}
              colorsTime={[10, 5, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
              {/* {RenderTime} */}

              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
          <div className='flex w-full'>
            <OneQuestion
              currentQuestions={currentQuestions[0]}
              updateQuestion={updateQuestion}
              // setChange={setChange}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <PaginationComp
          handleChange={handleChange}
          currentPage={currentPage}
          count={count}
        />
        <Button
          onClick={() => handleSubmit()}
          colorScheme='teal'
          isFullWidth={true}
        >
          Submit
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TriviaQuizComponent;
