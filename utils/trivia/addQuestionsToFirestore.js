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

const AddQuestionsToFirestore = async (newArr, email, figures) => {
  // setIsConfirmed(true);
  // console.log("match selcted: ", matchSelect);
  console.log('newArr firebase: ', newArr);
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
    newArr.forEach(
      async (ques) =>
        await addDoc(predictRef, {
          question: ques?.question,
          optionA: ques?.optionA,
          optionB: ques?.optionB,
          optionC: ques?.optionC,
          response: ques?.response,
          rightAnswer: ques?.rightAnswer,
          createdAt: nowDate,
          noOfQuestions: figures.noOfQuestions,
          correctAnswers: figures.correctAnswers,
          wrongAnswers: figures.wrongAnswers,
        })
    );

    await setDoc(
      parentRef,
      {
        // createdAt: nowDate,
        ID: docID,
      },
      { merge: true }
    );
    toast.success('✅ Added successfully');
    // console.log("data added successfully");
  } catch (err) {
    console.error('error - addMatchToFirestore', err);
  } finally {
    // setIsConfirmed(false);
  }
};

export default AddQuestionsToFirestore;
