import SetUserHistory from '../wallet/setUserHistory';
const qs = require('qs');
import axios from 'axios';
// import { doc } from 'firebase/firestore';

const ClaimFreeCoins = async (setIsLoad, userDoc, setUserDoc) => {
  setIsLoad(true);
  try {
    // const userRef = doc(db, 'Users', user?.uid);
    // const userCoinsData = await getDoc(userRef);
    // const userCoins = userCoinsData.data().coins;
    // const newCoins = userCoins + 15;
    // await setDoc(
    //   userRef,
    //   {
    //     freeClaim: true,
    //     coins: +newCoins,
    //     updatedAt: serverTimestamp(),
    //   },
    //   { merge: true }
    // );
    // const newData = {
    //   coins: 15,
    //   money: 0,
    //   activity: '',
    //   type: 'Claim Free Coins',
    // };
    // await SetUserHistory(userDoc, newData);
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
    const newcoins = usercoins + 15;

    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/${data?.data[0].id}`,
      {
        data: {
          coins: newcoins,
          freeClaim: true,
        },
      }
    );
    const newData = {
      coins: 15,
      money: 0,
      activity: '',
      type: 'Claim Free Coins',
    };
    await SetUserHistory(userDoc, newData);
    setUserDoc({ ...userDoc, freeClaim: true });
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoad(false);
  }
};

export default ClaimFreeCoins;
