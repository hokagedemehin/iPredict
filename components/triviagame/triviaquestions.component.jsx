import React, { useState } from 'react';
// import debounce from 'lodash.debounce';
// const _ = require('lodash');
// import { useRouter } from "next/router";

// import { useUser } from "../../../services/context/userContext";
// import moment from "moment";
import PaginationComp from './pagination.component';
import OneQuestion from './onequestion.component';
import { Button, Heading } from '@chakra-ui/react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import AddResponseToFirestore from '../../utils/trivia/addResponseToFirestore';
import { useUser } from '../../utils/auth/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultComponent from './result/result.component';
// import { useEffect } from 'react';
// import { useMemo } from 'react';

const TriviaQuizComponent = ({ data, ques, timer, price, type }) => {
  const router = useRouter();
  const { userDoc, user } = useUser();
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
  const [timeUp, setTimeUp] = useState(false);
  // console.log('res: ', res);
  // console.log('finalResult: ', finalResult);
  // console.log('calc: ', calc);

  const handleChange = (value) => {
    setCurrentPage(currentPage + value);
  };

  const handleSubmit = async () => {
    const figures = {
      correctAnswers: 0,
      wrongAnswers: 0,
      noOfQuestions: ques,
      price: price,
    };
    setResult(true);
    if (res.length == 0) {
      setFinalResult(data);
      setCalc(figures);
      await AddResponseToFirestore(finalResult, userDoc, calc, type);
      // if (Object.entries(calc).length !== 0 && finalResult.length !== 0) {
      // }
      // _.debounce(() => {
      //   // await AddResponseToFirestore(finalResult, user?.email, calc);
      //   console.log('debounce here');
      // }, 500);
    } else {
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
      await AddResponseToFirestore(finalResult, userDoc, calc, type);
    }
    // if (finalResult.length !== 0) {
    //   await AddResponseToFirestore(finalResult, user?.email, calc);
    // }
    // console.log('figures: ', figures);
    // console.log('newArr: ', newArr);
  };

  // useEffect(() => {
  //   if (finalResult.length !== 0 && calc.length !== 0) {
  //     AddResponseToFirestore(finalResult, user?.email, calc);
  //   }

  //   return () => {};
  // }, [finalResult]);

  // useMemo(
  //   async () => await AddResponseToFirestore(finalResult, user?.email, calc),
  //   [calc]
  // );

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

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      // handleSubmit();
      setResult(true);
      setTimeUp(true);
      return (
        <ResultComponent
          figures={calc}
          handleSubmit={handleSubmit}
          timeUp={timeUp}
          finalResult={finalResult}
        />
      );
    }

    return (
      <div className=''>
        <div className=''>{remainingTime}</div>
      </div>
    );
  };

  return (
    <div className=''>
      <div className='flex'>
        <div className='flex flex-col w-72 sm:w-[28rem]'>
          <div className='flex justify-between'>
            <Button
              variant='link'
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/triviagame')}
            >
              Back
            </Button>
            {/* {!result && (
              <div className='flex'>
                <Button
                  onClick={() => handleSubmit()}
                  colorScheme='teal'
                  variant='link'
                  rightIcon={<ArrowForwardIcon />}
                >
                  Submit
                </Button>
              </div>
            )} */}
          </div>
          {!result && (
            <div className='flex flex-col'>
              <div className='flex justify-between items-center'>
                <Heading className='my-5'>Question {currentPage}</Heading>
                <CountdownCircleTimer
                  isPlaying
                  strokeWidth={5}
                  size={50}
                  duration={timer}
                  colors={['#004777', '#F7B801', '#A30000']}
                  colorsTime={[60, 30, 0]}
                  // onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                >
                  {renderTime}

                  {/* {({ remainingTime }) => remainingTime} */}
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
          )}
        </div>
      </div>
      {!result && (
        <div className='flex flex-col w-full'>
          <PaginationComp
            handleChange={handleChange}
            currentPage={currentPage}
            count={count}
          />
          {/* <Button
            onClick={() => handleSubmit()}
            colorScheme='teal'
            isFullWidth={true}
          >
            Submit
          </Button> */}
        </div>
      )}
      {!result && (
        <div className=' mt-10'>
          <Button
            onClick={() => handleSubmit()}
            colorScheme='teal'
            isFullWidth={true}
            rightIcon={<ArrowForwardIcon />}
            fontSize='xl'
          >
            Submit
          </Button>
        </div>
      )}
      <ToastContainer />
      {result && (
        <ResultComponent
          figures={calc}
          handleSubmit={handleSubmit}
          timeUp={timeUp}
          finalResult={finalResult}
          user={user}
        />
      )}
    </div>
  );
};

export default TriviaQuizComponent;
