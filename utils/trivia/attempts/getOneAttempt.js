import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const GetOneAttemptQuestions = async (attemptID, email) => {
  const triviaOneAttemptRef = collection(
    db,
    `${email}-trivia`,
    `${attemptID}`,
    `${attemptID}`
  );
  const triviaOneAttemptSnapshot = await getDocs(triviaOneAttemptRef);
  return triviaOneAttemptSnapshot;
};

export default GetOneAttemptQuestions;
