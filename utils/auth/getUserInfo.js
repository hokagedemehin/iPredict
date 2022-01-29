import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetUserInfo = async (user) => {
  // console.log('uid', user?.uid);
  const userRef = doc(db, 'Users', user?.uid);
  const userData = await getDoc(userRef);
  // const unSub = onSnapshot(userRef, (docs) => {
  //   setUserData(docs.data());
  //   console.log('data', docs.data());
  // });
  // unSub();
  return userData;
};

export default GetUserInfo;
