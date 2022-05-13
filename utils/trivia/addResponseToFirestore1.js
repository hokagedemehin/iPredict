// import { db } from '../firebase/firebase';

// import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import axios from 'axios';

// import DeductCoinsFromWallet from '../wallet/deductCoinsFromWallet';

const AddResponseToFirestore1 = async (finalResult, userDoc, figures, type) => {
  const email = userDoc?.email;
  const firstName = userDoc?.firstName;
  const lastName = userDoc?.lastName;
  const noOfQuestions = figures?.noOfQuestions;
  const correctAnswers = figures?.correctAnswers;
  const wrongAnswers = figures?.noOfQuestions - figures?.correctAnswers;
  const winner = figures?.correctAnswers == 10 ? 'yes' : 'no';
  // console.log('firestore figures: ', figures);
  // console.log('finalResult firebase: ', finalResult);
  // const nowDate = new Date();
  // const docID = Date.now().toString();

  try {
    // create new trivia attempt and save the id
    const id = nanoid();
    const { data: attempt } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivia-attempts`,
      {
        data: {
          attemptId: id,
          correctAnswers: +correctAnswers,
          email: email,
          firstName: firstName,
          lastName: lastName,
          noOfQuestions: +noOfQuestions,
          wrongAnswers: +wrongAnswers,
          winner: winner,
          type: type,
        },
      }
    );
    // create new trivia responses and store the attempts id as a relationship

    finalResult.forEach(async (values) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivia-responses`,
        {
          data: {
            quesId: values?.quesId,
            question: values?.question.trim(),
            answer: values?.answer.trim(),
            optionA: values?.optionA.trim(),
            optionB: values?.optionB.trim(),
            optionC: values?.optionC.trim(),
            response: !values?.response ? '' : values?.response,
            trivia_attempt: attempt?.data?.id,
          },
        }
      );
    });
    toast.success('✅ Added successfully');
  } catch (error) {
    console.error(error);
  }

  // const parentRef = doc(
  //   db,
  //   `${email}-trivia`,
  //   docID
  //   // `Match - ${matchDate}`,
  //   // docID
  // );

  //   const predictRef = collection(db, `${email}-trivia`, docID, `${docID}`);
  //   try {
  //     // await setDoc(parentRef, {
  //     //   createdAt: nowDate,
  //     //   confirmed: true,
  //     // });
  //     finalResult.forEach(
  //       async (ques) =>
  //         await addDoc(predictRef, {
  //           question: ques?.question,
  //           optionA: ques?.optionA,
  //           optionB: ques?.optionB,
  //           optionC: ques?.optionC,
  //           response: !ques?.response ? '' : ques?.response,
  //           rightAnswer: ques?.rightAnswer,
  //           createdAt: nowDate,
  //         })
  //     );

  //     await setDoc(
  //       parentRef,
  //       {
  //         createdAt: nowDate,
  //         ID: docID,
  //         noOfQuestions: noOfQuestions,
  //         correctAnswers: correctAnswers,
  //         wrongAnswers: wrongAnswers,
  //         winner: winner,
  //         firstname: firstName,
  //         lastName: lastName,
  //         email: email,
  //         type: type,
  //       },
  //       { merge: true }
  //     );

  //     // Also write the attempts to trivia attempts collection for admin use

  //     const triviaAttemptsRef = collection(db, 'TriviaAttempts');
  //     const newID = await addDoc(triviaAttemptsRef, {
  //       createdAt: nowDate,
  //       attemptID: docID,
  //       // noOfQuestions: figures?.noOfQuestions,
  //       // correctAnswers: figures?.correctAnswers,
  //       // wrongAnswers: figures?.noOfQuestions - figures?.correctAnswers,
  //       // winner: figures?.correctAnswers == 10 ? 'yes' : 'no',
  //       noOfQuestions: noOfQuestions,
  //       correctAnswers: correctAnswers,
  //       wrongAnswers: wrongAnswers,
  //       winner: winner,
  //       fullName: `${firstName} ${lastName}`,
  //       // firstname: firstName,
  //       // lastName: lastName,
  //       email: email,
  //       type: type,
  //     });
  //     const triviaAttemptsCollectionRef = doc(db, `TriviaAttempts`, newID.id);
  //     await setDoc(
  //       triviaAttemptsCollectionRef,
  //       {
  //         docId: newID.id,
  //       },
  //       { merge: true }
  //     );

  //     // DeductCoinsFromWallet(coins, uid);

  //     toast.success('✅ Added successfully');

  //     // console.log("data added successfully");
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     // setIsConfirmed(false);
  //   }
};

export default AddResponseToFirestore1;
