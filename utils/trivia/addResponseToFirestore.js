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

const AddResponseToFirestore = async (finalResult, userDoc, figures) => {
  // setIsConfirmed(true);
  const email = userDoc?.email;
  const firstName = userDoc?.firstName;
  const lastName = userDoc?.lastName;

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
          winner: 'winner',
          firstname: firstName,
          lastName: lastName,
          email: email,
        })
    );

    await setDoc(
      parentRef,
      {
        createdAt: nowDate,
        ID: docID,
        noOfQuestions: figures?.noOfQuestions,
        correctAnswers: figures?.correctAnswers,
        wrongAnswers: figures?.noOfQuestions - figures?.correctAnswers,
      },
      { merge: true }
    );
    toast.success('✅ Added successfully');
    // console.log("data added successfully");
  } catch (err) {
    console.error('error - addResponseToFirestore', err);
  } finally {
    // setIsConfirmed(false);
  }
};

export default AddResponseToFirestore;
