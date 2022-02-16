import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetBanner = async () => {
  const collectionRef = doc(db, `Prize&People`, 'values');

  const collecionData = await getDoc(collectionRef);
  // console.log('collecionData', collecionData.data());
  return collecionData.data();
};

export default GetBanner;
