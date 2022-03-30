import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetUserQuestionsFromFirebase = async () => {
  const questionRef = collection(db, 'TriviaQuestions');
  const q = query(
    questionRef,
    where('visible', '==', 'yes')
    // orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  // console.log("querysnapshot: ", querySnapshot);
  // const newArr = [];
  // querySnapshot.forEach((doc) => newArr.push(doc.data()));
  // if (newArr.length !== 0) {
  //   // setQuestions(newArr);
  // }
  return querySnapshot;
};

export default GetUserQuestionsFromFirebase;
