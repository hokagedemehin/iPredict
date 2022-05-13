// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase/firebase';

import axios from 'axios';
const qs = require('qs');

const GetOneAttemptQuestions = async (attemptID, email) => {
  // const triviaOneAttemptRef = collection(
  //   db,
  //   `${email}-trivia`,
  //   `${attemptID}`,
  //   `${attemptID}`
  // );
  // const triviaOneAttemptSnapshot = await getDocs(triviaOneAttemptRef);
  // return triviaOneAttemptSnapshot;
  const query = qs.stringify(
    {
      filters: {
        $and: [
          {
            email: {
              $eq: email,
            },
          },
          {
            attemptId: {
              $eq: attemptID,
            },
          },
        ],
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivia-attempts?${query}`
  );
  // console.log('data', data);
  let newArr = [];
  data?.data[0]?.attributes?.trivia_responses?.data.forEach((elem) => {
    newArr.push(elem?.attributes);
  });
  return newArr;
};

export default GetOneAttemptQuestions;
