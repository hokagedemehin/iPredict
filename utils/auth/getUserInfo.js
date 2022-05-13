// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
const qs = require('qs');
import axios from 'axios';

const GetUserInfo = async (userDoc) => {
  // console.log('uid', user?.uid);
  // const userRef = doc(db, 'Users', userDoc?.uid);
  // const userData = await getDoc(userRef);
  // const unSub = onSnapshot(userRef, (docs) => {
  //   setUserData(docs.data());
  //   console.log('data', docs.data());
  // });
  // unSub();

  const query = qs.stringify(
    {
      filters: {
        email: {
          $eq: userDoc?.email,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${query}`
  );

  return data?.data[0].attributes;
};

export default GetUserInfo;
