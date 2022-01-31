import { doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const UpdateUserWallet = async (coins, uid) => {
  const userRef = doc(db, 'Users', uid);
  const userCoinsData = await getDoc(userRef);
  const userCoins = userCoinsData.data().coins;
  const newCoins = userCoins + coins;
  await updateDoc(userRef, {
    coins: +newCoins,
    updatedAt: serverTimestamp(),
  });
};

export default UpdateUserWallet;
