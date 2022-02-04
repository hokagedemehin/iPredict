import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const SetUserHistory = async (userDoc, data) => {
  // console.log('uid', user?.uid);
  const userRef = collection(db, `${userDoc?.email}-history`);
  const userData = await addDoc(userRef, {
    createdAt: serverTimestamp(),
    email: userDoc?.email,
    fullName: `${userDoc?.firstName} ${userDoc?.lastName}`,
    coins: data?.coins,
    money: data?.money,
    activity: data?.activity,
    type: data?.type,
  });

  return userData;
};

export default SetUserHistory;
