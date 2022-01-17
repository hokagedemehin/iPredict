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
import ResultComponent from './result/result.component';

const TriviaQuizComponent = ({ data, ques, timer }) => {
  const router = useRouter();
  const { user } = useUser();
  // const timer = timer
  const newArr = [];
  // const figures = { correctAnswers: 0, wrongAnswers: 0, noOfQuestions: ques };
  // console.log('data: ', data);

  const [currentPage, setCurrentPage] = useState(1);
  const [questionPerPage] = useState(1);
  const [res, setRes] = useState([]);
  const [result, setResult] = useState(false);
  const [finalResult, setFinalResult] = useState([]);
  const [calc, setCalc] = useState({});
  // console.log('res: ', res);
  console.log('finalResult: ', finalResult);
  // console.log('result: ', result);

  const handleChange = (value) => {
    setCurrentPage(currentPage + value);
  };

  const handleSubmit = async () => {
    const figures = { correctAnswers: 0, wrongAnswers: 0, noOfQuestions: ques };
    setResult(true);
    for (const [key, value] of Object.entries(res)) {
      const ans = data.filter((val) => val.ID === key);
      ans[0].response = value;
      // console.log('ans: ', ans);
      if (
        ans[0].rightAnswer.toLowerCase().trim() == value.toLowerCase().trim()
      ) {
        figures.correctAnswers = figures.correctAnswers + 1;
      } else {
        figures.wrongAnswers = figures.wrongAnswers + 1;
      }
      newArr.push(...ans);
    }
    setCalc(figures);
    setFinalResult(newArr);
    // console.log('figures: ', figures);
    // console.log('newArr: ', newArr);
    await AddQuestionsToFirestore(newArr, user?.email, calc);
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
    const values = { [id]: value };
    setRes({ ...res, ...values });
  };

  const count = data.length;

  // const renderTime = ({ remainingTime }) => {
  //   if (remainingTime === 0) {
  //     // handleSubmit();
  //     setResult(true);
  //     return;
  //   }

  //   return (
  //     <div className=''>
  //       <div className=''>{remainingTime}</div>
  //     </div>
  //   );
  // };

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
              duration={timer}
              colors={['#004777', '#F7B801', '#A30000']}
              colorsTime={[10, 5, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
              {/* {renderTime} */}

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
          setResult={setResult}
        >
          Submit
        </Button>
      </div>
      <ToastContainer />
      {result && (
        <ResultComponent res={res} figures={calc} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default TriviaQuizComponent;
