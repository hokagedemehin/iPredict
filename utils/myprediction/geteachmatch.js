import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetEachMatch = async (user, oneDate, matchID) => {
  const matchRef = collection(db, `${user?.email}-matches`, matchID, oneDate);
  const q = query(matchRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
  // const newArr = [];
  // querySnapshot.forEach((doc) => newArr.push(doc.data()));
  // if (newArr.length !== 0) {
  //   setMatches(newArr);
  // }
};

export default GetEachMatch;
