import axios from 'axios';
// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { db } from '../../firebase/firebase';
const qs = require('qs');

const GetAllTriviaAttempts = async (email) => {
  // const triviaAttemptsRef = collection(db, `${email}-trivia`);
  // const orderData = query(triviaAttemptsRef, orderBy('createdAt', 'desc'));
  // const triviaAttemptSnapshot = await getDocs(orderData);
  // return triviaAttemptSnapshot;
  const query = qs.stringify(
    {
      filters: {
        email: {
          $eq: email,
        },
      },
      sort: ['id:desc'],
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
  data?.data.forEach((elem) => {
    newArr.push(elem?.attributes);
  });
  return newArr;
};

export default GetAllTriviaAttempts;
