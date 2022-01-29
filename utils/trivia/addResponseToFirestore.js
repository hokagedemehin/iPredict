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

const AddResponseToFirestore = async (finalResult, userDoc, figures, type) => {
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
        winner: figures?.correctAnswers == 10 ? 'winner' : null,
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
      noOfQuestions: figures?.noOfQuestions,
      correctAnswers: figures?.correctAnswers,
      wrongAnswers: figures?.noOfQuestions - figures?.correctAnswers,
      winner: figures?.correctAnswers == 10 ? 'yes' : 'no',
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
    toast.success('✅ Added successfully');
    // console.log("data added successfully");
  } catch (err) {
    console.error('error - addResponseToFirestore', err);
  } finally {
    // setIsConfirmed(false);
  }
};

export default AddResponseToFirestore;
