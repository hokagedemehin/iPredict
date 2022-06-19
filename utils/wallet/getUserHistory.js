// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
const qs = require('qs');
import axios from 'axios';

const GetUserHistory = async (user) => {
  // console.log('uid', user?.uid);
  // const = doc(db, 'Users', user?.uid);/
  // const userHistoryRef = collection(db, `${user?.email}-history`);
  // const userHistoryData = query(userHistoryRef, orderBy('createdAt', 'desc'));
  // const userHistorySnapshot = await getDocs(userHistoryData);

  const query = qs.stringify(
    {
      filters: {
        email: {
          $eq: user?.email,
        },
        $or: [
          { type: { $eq: 'Buy Coins' } },
          { type: { $eq: 'Claim Free Coins' } },
          { type: { $eq: 'Match Prediction' } },
          { type: { $eq: 'Start Trivia Quiz' } },
          { type: { $eq: 'Trivia Game Reward' } },
          { type: { $eq: 'Magazine Subscription' } },
          { type: { $eq: 'Buy Card' } },
          // { type: { $eq: 'User Card Reward' } },
          { type: { $eq: 'User Match Reward' } },
        ],
      },
      sort: ['id:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/histories?${query}`
  );

  return data?.data;
};

export default GetUserHistory;
