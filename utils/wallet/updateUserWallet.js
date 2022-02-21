import { doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import SetUserHistory from './setUserHistory';

const UpdateUserWallet = async (coins, uid, userDoc) => {
  const userRef = doc(db, 'Users', uid);
  const userCoinsData = await getDoc(userRef);
  const userCoins = userCoinsData.data().coins;
  const newCoins = userCoins + coins;
  await updateDoc(userRef, {
    coins: +newCoins,
    updatedAt: serverTimestamp(),
  });
  const newData = {
    coins: coins,
    money: 0,
    activity: '',
    type: 'Buy Coins',
  };
  await SetUserHistory(userDoc, newData);
};

export default UpdateUserWallet;
