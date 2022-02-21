import { db } from '../firebase/firebase';

import {
  collection,
  addDoc,
  setDoc,
  doc,
  // getDocs,
  // updateDoc,
  // // serverTimestamp,
  // query,
  // where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import DeductCoinsFromWallet from '../wallet/deductCoinsFromWallet';

const AddResponseToFirestore = async (
  finalResult,
  userDoc,
  figures,
  type
  // user,
  // coins
) => {
  // setIsConfirmed(true);
  // const uid = user?.uid;
  const email = userDoc?.email;
  const firstName = userDoc?.firstName;
  const lastName = userDoc?.lastName;
  const noOfQuestions = figures?.noOfQuestions;
  const correctAnswers = figures?.correctAnswers;
  const wrongAnswers = figures?.noOfQuestions - figures?.correctAnswers;
  const winner = figures?.correctAnswers == 10 ? 'yes' : 'no';
  // console.log('firestore figures: ', figures);
  // console.log('finalResult firebase: ', finalResult);
  const nowDate = new Date();
  const docID = Date.now().toString();

  const parentRef = doc(
    db,
    `${email}-trivia`,
    docID
    // `Match - ${matchDate}`,
    // docID
  );

  const predictRef = collection(db, `${email}-trivia`, docID, `${docID}`);
  try {
    // await setDoc(parentRef, {
    //   createdAt: nowDate,
    //   confirmed: true,
    // });
    finalResult.forEach(
      async (ques) =>
        await addDoc(predictRef, {
          question: ques?.question,
          optionA: ques?.optionA,
          optionB: ques?.optionB,
          optionC: ques?.optionC,
          response: !ques?.response ? '' : ques?.response,
          rightAnswer: ques?.rightAnswer,
          createdAt: nowDate,
        })
    );

    await setDoc(
      parentRef,
      {
        createdAt: nowDate,
        ID: docID,
        noOfQuestions: noOfQuestions,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        winner: winner,
        firstname: firstName,
        lastName: lastName,
        email: email,
        type: type,
      },
      { merge: true }
    );

    // Also write the attempts to trivia attempts collection for admin use

    const triviaAttemptsRef = collection(db, 'TriviaAttempts');
    const newID = await addDoc(triviaAttemptsRef, {
      createdAt: nowDate,
      attemptID: docID,
      // noOfQuestions: figures?.noOfQuestions,
      // correctAnswers: figures?.correctAnswers,
      // wrongAnswers: figures?.noOfQuestions - figures?.correctAnswers,
      // winner: figures?.correctAnswers == 10 ? 'yes' : 'no',
      noOfQuestions: noOfQuestions,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
      winner: winner,
      fullName: `${firstName} ${lastName}`,
      // firstname: firstName,
      // lastName: lastName,
      email: email,
      type: type,
    });
    const triviaAttemptsCollectionRef = doc(db, `TriviaAttempts`, newID.id);
    await setDoc(
      triviaAttemptsCollectionRef,
      {
        docId: newID.id,
      },
      { merge: true }
    );

    // DeductCoinsFromWallet(coins, uid);

    toast.success('✅ Added successfully');

    // console.log("data added successfully");
  } catch (err) {
    console.error('error - addResponseToFirestore', err);
  } finally {
    // setIsConfirmed(false);
  }
};

export default AddResponseToFirestore;
