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
// import AddResponseToFirestore from '../../utils/trivia/addResponseToFirestore';
import { useUser } from '../../utils/auth/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultComponent from './result/result.component';
import AddResponseToFirestore1 from '../../utils/trivia/addResponseToFirestore1';
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
  const [res, setRes] = useState({});
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
    // console.log('submit quiz');
    const figures = {
      correctAnswers: 0,
      wrongAnswers: 0,
      noOfQuestions: ques,
      price: price,
    };

    if (Object.keys(res).length === 0) {
      // console.log('empty response');
      let newArr = [];
      data.forEach((elem) => newArr.push(elem?.attributes));
      setFinalResult(newArr);
      setCalc(figures);
      // console.log('finalResult', finalResult);
      // console.log('calc', calc);
      // await AddResponseToFirestore(finalResult, userDoc, calc, type);
      await AddResponseToFirestore1(finalResult, userDoc, figures, type);

      // if (Object.entries(calc).length !== 0 && finalResult.length !== 0) {
      // }
      // _.debounce(() => {
      //   // await AddResponseToFirestore(finalResult, user?.email, calc);
      //   console.log('debounce here');
      // }, 500);
    } else {
      // console.log('there was activity');
      let newArr1 = [];
      data.forEach((elem) => newArr1.push(elem?.attributes));
      // console.log('newArr1 :>> ', newArr1);
      for (const [key, value] of Object.entries(res)) {
        const ans = newArr1.filter((val) => val.quesId == key);
        let ans1 = ans[0];
        // console.log(ans);
        ans1.response = value;
        // console.log('ans: ', ans);
        if (ans1.answer.toLowerCase().trim() == value.toLowerCase().trim()) {
          figures.correctAnswers = figures.correctAnswers + 1;
        } else {
          figures.wrongAnswers = figures.wrongAnswers + 1;
        }
        // console.log(ans1);
        newArr.push(ans1);
        setFinalResult(...finalResult, ans1);
        setCalc(figures);
      }
      // console.log('newArr :>> ', newArr);
      // console.log('figures', figures);
      // setCalc(figures);
      // setFinalResult(newArr);
      // console.log('finalResult :>> ', finalResult);
      // console.log('calc', calc);

      // await AddResponseToFirestore(finalResult, userDoc, calc, type);
      await AddResponseToFirestore1(newArr, userDoc, figures, type);
    }
    setResult(true);
  };

  const indexOfLastQuestion = currentPage * questionPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionPerPage;
  const currentQuestions = data?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // console.log('currentQuestions :>> ', currentQuestions);

  const updateQuestion = (value) => {
    // get the question that is being answered
    currentQuestions[0].attributes.response = value;
    const id = currentQuestions[0]?.attributes.quesId;
    const values = { [id]: value };
    setRes({ ...res, ...values });
  };

  const count = data.length;

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      // await handleSubmit();
      setResult(true);
      setTimeUp(true);
      // console.log('time up');
      return null;
      // return (
      //   <ResultComponent
      //     figures={calc}
      //     handleSubmit={handleSubmit}
      //     timeUp={timeUp}
      //     finalResult={finalResult}
      //     userDoc={userDoc}
      //     user={user}
      //   />
      // );
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
          userDoc={userDoc}
          user={user}
        />
      )}
    </div>
  );
};

export default TriviaQuizComponent;
