import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const GetAllTriviaAttempts = async (email) => {
  const triviaAttemptsRef = collection(db, `${email}-trivia`);
  const triviaAttemptSnapshot = await getDocs(triviaAttemptsRef);
  return triviaAttemptSnapshot;
};

export default GetAllTriviaAttempts;
