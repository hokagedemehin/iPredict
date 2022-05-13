// import { doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
const qs = require('qs');
import axios from 'axios';

const DeductCoinsFromWallet = async (coins, userDoc, setUserDoc) => {
  // const userRef = doc(db, 'Users', email);
  // const userCoinsData = await getDoc(userRef);
  // const userCoins = userCoinsData.data().coins;
  // const newCoins = userCoins - coins;
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
  const newcoins = usercoins - coins;

  await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/${data?.data[0].id}`,
    {
      data: {
        coins: newcoins,
      },
    }
  );
  setUserDoc({ ...userDoc, coins: newcoins });
};

export default DeductCoinsFromWallet;
