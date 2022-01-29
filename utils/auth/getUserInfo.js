import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetUserInfo = async (user) => {
  const userRef = doc(db, 'Users', user?.uid);
  const userData = await getDoc(userRef);
  return userData;
};

export default GetUserInfo;
