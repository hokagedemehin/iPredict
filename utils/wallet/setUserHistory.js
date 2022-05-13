import axios from 'axios';
// import {
//   addDoc,
//   collection,
//   doc,
//   serverTimestamp,
//   setDoc,
// } from 'firebase/firestore';
import { nanoid } from 'nanoid';
// import { db } from '../firebase/firebase';

const SetUserHistory = async (userDoc, data) => {
  // console.log('uid', user?.uid);
  // const docID = Date.now().toString();
  // const userRef = doc(db, `${userDoc?.email}-history`, docID);
  // const userData = await setDoc(userRef, {
  //   createdAt: serverTimestamp(),
  //   ID: docID,
  //   email: userDoc?.email,
  //   fullName: `${userDoc?.firstName} ${userDoc?.lastName}`,
  //   coins: data?.coins,
  //   money: data?.money,
  //   activity: data?.activity,
  //   type: data?.type,
  // });

  // const userCollectionRef = doc(db, `${userDoc?.email}-history`, userData.id);
  // await setDoc(
  //   userCollectionRef,
  //   {
  //     docId: userData.id,
  //   },
  //   { merge: true }
  // );

  // const transactionsRef = collection(db, 'Transactions');
  // const newID = await addDoc(transactionsRef, {
  //   createdAt: serverTimestamp(),
  //   email: userDoc?.email,
  //   fullName: `${userDoc?.firstName} ${userDoc?.lastName}`,
  //   coins: data?.coins,
  //   money: data?.money,
  //   activity: data?.activity,
  //   type: data?.type,
  // });

  // const transactionCollectionRef = doc(db, 'Transactions', newID.id);
  // await setDoc(
  //   transactionCollectionRef,
  //   {
  //     docId: newID.id,
  //   },
  //   { merge: true }
  // );

  const id = nanoid();

  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/histories`, {
    data: {
      historyId: id,
      email: userDoc?.email,
      fullName: `${userDoc?.firstName} ${userDoc?.lastName}`,
      coins: data?.coins,
      money: data?.money,
      activity: data?.activity,
      type: data?.type,
    },
  });

  // return userData;
};

export default SetUserHistory;
