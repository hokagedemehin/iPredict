import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetUserHistory = async (user) => {
  // console.log('uid', user?.uid);
  // const = doc(db, 'Users', user?.uid);/
  const userHistoryRef = collection(db, `${user?.email}-history`);
  const userHistoryData = query(userHistoryRef, orderBy('createdAt', 'desc'));
  const userHistorySnapshot = await getDocs(userHistoryData);
  return userHistorySnapshot;
};

export default GetUserHistory;
