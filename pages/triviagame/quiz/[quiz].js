// import { Heading } from "@chakra-ui/react";
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import { useUser } from '../../utils/auth/userContext';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Layout from '../../../components/layout/layout';
// import { useQuery } from 'react-query';
// import GetUserQuestionsFromFirebase from '../../../utils/trivia/getQuestions';
import TriviaQuizComponent from '../../../components/triviagame/triviaquestions.component';
import axios from 'axios';
const qs = require('qs');

const TriviaGamesPageQuiz = ({ quizType, quizzes }) => {
  const [start, setStart] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  // const router = useRouter();
  // console.log('quizType', quizType);
  // console.log('quizzes :>> ', quizzes);

  useEffect(() => {
    let arr = shuffle(quizzes).slice(0, 10);

    setStart(arr);
  }, []);

  const timer = 60;

  // const { data, isSuccess } = useQuery(
  //   'viewquestions',
  //   async () => await GetUserQuestionsFromFirebase()
  // );
  // console.log('data :>> ', data);
  // if (router?.components) {
  //   // console.log("router: ", Object?.keys(router?.components).length);
  //   // console.log('router: ', router);
  //   console.log('router: ', router?.components['/triviagame']);
  //   console.log('router: ', typeof router);
  // }
  // useEffect(() => {
  //   if (isSuccess) {
  //     let newArr = [];
  //     const ques = parseInt(router.query.quiz[0]);

  //     data.forEach((doc) => newArr.push(doc.data()));
  //     // if (newArr.length !== 0) {

  //     newArr = shuffle(newArr).slice(0, ques);

  //     setStart(newArr);
  //     // }
  //   }
  // }, [isSuccess]);
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
  // **********RESTORE*************************
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [user]);
  // useEffect(() => {
  //   if (router?.components['/triviagame'] === undefined) {
  //     router.push('/triviagame');
  //   }
  // }, []);
  // **********RESTORE*************************

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
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
          // <TriviaQuizComponent
          //   data={start}
          //   ques={parseInt(router?.query?.quiz[0])}
          //   price={router?.query?.quiz[2]}
          //   timer={timer}
          //   type={router?.query.quiz[1]}
          //   // coins={router?.query.quiz[3]}
          // />
          <TriviaQuizComponent
            data={start}
            ques={10}
            price={quizType[0]?.attributes?.price}
            timer={timer}
            type={quizType[0]?.attributes?.name}
            // coins={router?.query.quiz[3]}
          />
        )}
      </div>
    </Layout>
  );
};

export default TriviaGamesPageQuiz;

export async function getStaticPaths() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz-buttons`
  );
  const paths = data?.data?.map((elem) => ({
    params: { quiz: elem?.attributes?.name },
  }));
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const query = qs.stringify(
    {
      filters: {
        name: {
          $eq: params?.quiz,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const queryQuiz = qs.stringify(
    {
      filters: {
        visible: {
          $eq: true,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data: quizType } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz-buttons?${query}`
  );

  const { data: quizzes } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias?${queryQuiz}`
  );
  return {
    props: {
      quizType: quizType?.data,
      quizzes: quizzes?.data,
    },
    revalidate: 5,
  };
}
