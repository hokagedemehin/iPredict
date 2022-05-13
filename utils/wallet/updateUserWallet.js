// import { doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
import SetUserHistory from './setUserHistory';
const qs = require('qs');
import axios from 'axios';

const UpdateUserWallet = async (coins, uid, userDoc, setUserDoc) => {
  // const userRef = doc(db, 'Users', uid);
  // const userCoinsData = await getDoc(userRef);
  // const userCoins = userCoinsData.data().coins;
  // const newCoins = userCoins + coins;
  // await updateDoc(userRef, {
  //   coins: +newCoins,
  //   updatedAt: serverTimestamp(),
  // });

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
  const usercoins = data?.data[0].attributes?.coins;
  const newcoins = usercoins + coins;

  // console.log('data :>> ', data);

  await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/${data?.data[0].id}`,
    {
      data: {
        coins: newcoins,
      },
    }
  );
  const newData = {
    coins: coins,
    money: 0,
    activity: '',
    type: 'Buy Coins',
  };
  await SetUserHistory(userDoc, newData);
  setUserDoc({ ...userDoc, coins: newcoins });
};

export default UpdateUserWallet;
