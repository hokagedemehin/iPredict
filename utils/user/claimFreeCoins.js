import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const ClaimFreeCoins = async (user) => {
  const docRef = doc(db, 'Users', user?.uid);
  await setDoc(
    docRef,
    {
      freeClaim: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export default ClaimFreeCoins;
