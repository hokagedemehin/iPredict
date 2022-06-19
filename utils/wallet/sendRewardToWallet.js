// import { doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
import SetUserHistory from './setUserHistory';
const qs = require('qs');
import axios from 'axios';

const SendRewardToWallet = async (money, userDoc, setUserDoc, type) => {
  // const userRef = doc(db, 'Users', uid);
  // const userMoneyData = await getDoc(userRef);
  // const userMoney = userMoneyData.data().money;
  // const newMoney = userMoney + money;
  // await updateDoc(userRef, {
  //   money: +newMoney,
  //   updatedAt: serverTimestamp(),
  // });
  // const newData = {
  //   coins: 0,
  //   money: money,
  //   activity: '',
  //   type: 'Trivia Game Reward',
  // };
  // await SetUserHistory(userDoc, newData);
  // toast.success('✅ Reward Received');
  const query = qs.stringify(
    {
      filters: {
        email: {
          $eq: userDoc?.email,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${query}`
  );
  const userMoney = data?.data[0].attributes?.money;
  const newMoney = userMoney + money;

  await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/${data?.data[0].id}`,
    {
      data: {
        money: newMoney,
      },
    }
  );

  const newData = {
    coins: 0,
    money: money,
    activity: '',
    type: type,
  };

  await SetUserHistory(userDoc, newData);
  setUserDoc({ ...userDoc, money: newMoney });
};

export default SendRewardToWallet;
