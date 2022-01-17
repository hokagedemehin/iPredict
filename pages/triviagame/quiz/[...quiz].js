// import { Heading } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import { useUser } from '../../utils/auth/userContext';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Layout from '../../../components/layout/layout';
import { useQuery } from 'react-query';
import GetUserQuestionsFromFirebase from '../../../utils/trivia/getQuestions';
import TriviaQuizComponent from '../../../components/triviagame/triviaquestions.component';

const TriviaGamesPageQuiz = () => {
  const [start, setStart] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const router = useRouter();
  // console.log('router: ', router);
  // const { user } = useUser();
  let timer = 0;
  if (router?.query?.quiz) {
    timer = router?.query?.quiz[0] == 10 ? 15 : 20;
  }

  const { data, isSuccess } = useQuery(
    'viewquestions',
    async () => await GetUserQuestionsFromFirebase()
  );
  // if (router?.components) {
  //   // console.log("router: ", Object?.keys(router?.components).length);
  //   // console.log('router: ', router);
  //   console.log('router: ', router?.components['/triviagame']);
  //   console.log('router: ', typeof router);
  // }
  useEffect(() => {
    if (isSuccess) {
      let newArr = [];
      const ques = parseInt(router.query.quiz[0]);

      data.forEach((doc) => newArr.push(doc.data()));
      // if (newArr.length !== 0) {

      newArr = shuffle(newArr).slice(0, ques);

      setStart(newArr);
      // }
    }
  }, [isSuccess]);
  // console.log(startQuiz);
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setStartQuiz(true);
      return <div className=''>Begin</div>;
    }

    return (
      <div className=''>
        <div className=''>Starts in</div>
        <div className=''>{remainingTime}</div>
      </div>
    );
  };

  useEffect(() => {
    if (router?.components['/triviagame'] === undefined) {
      router.push('/triviagame');
    }
  }, []);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <Layout name='quiz' desc='I-Predict Trivia Game Quiz ready Loader'>
      {/* <NavHeader /> */}
      {!startQuiz && (
        <div className=' flex justify-center items-center min-h-screen'>
          <div className=' text-center font-bold text-6xl'>
            {!startQuiz && (
              <CountdownCircleTimer
                isPlaying
                size={300}
                duration={6}
                colors={['#004777', '#F7B801', '#A30000']}
                colorsTime={[5, 3, 0]}
                // onComplete={() => ({ shouldRepeat: true, delay: 1 })}
              >
                {/* {RenderTime} */}
                {renderTime}
                {/* {({ remainingTime }) => remainingTime} */}
              </CountdownCircleTimer>
            )}
          </div>
        </div>
      )}
      <div className='flex justify-center items-center w-full pt-10'>
        {startQuiz && (
          <TriviaQuizComponent
            data={start}
            ques={parseInt(router?.query?.quiz[0])}
            timer={timer}
          />
        )}
      </div>
    </Layout>
  );
};

export default TriviaGamesPageQuiz;
