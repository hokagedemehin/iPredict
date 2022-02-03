import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import SetUserHistory from '../wallet/setUserHistory';

const ClaimFreeCoins = async (user, setIsLoad, userDoc) => {
  setIsLoad(true);
  try {
    const userRef = doc(db, 'Users', user?.uid);
    const userCoinsData = await getDoc(userRef);
    const userCoins = userCoinsData.data().coins;
    const newCoins = userCoins + 15;
    await setDoc(
      userRef,
      {
        freeClaim: true,
        coins: +newCoins,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    const newData = {
      coins: 15,
      money: 0,
      activity: '',
      type: 'Claim Free Coins',
    };
    await SetUserHistory(userDoc, newData);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoad(false);
  }
};

export default ClaimFreeCoins;
