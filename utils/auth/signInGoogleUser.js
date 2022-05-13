import { auth, db } from '../firebase/firebase';
// import { useUser } from "../context/userContext";
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import {
  // signInWithRedirect,
  GoogleAuthProvider,
  // getRedirectResult,
  signInWithPopup,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SetUserHistory from '../wallet/setUserHistory';
const qs = require('qs');

export const SignInGoogleUser = async (referralCode) => {
  // TODO: create a firestore document with the firstname, lastname, email and Password
  // console.log(uid, displayName, email);

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { uid, displayName, email } = result.user;
    const docRef = doc(db, 'Users', uid);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // console.log("data: ", docSnap.data());
      const names = displayName.split(' ');
      await setDoc(
        docRef,
        {
          firstName: names[0],
          lastName: names[1],
          email: email,
          phoneNo: '',
          birthDay: '1 Jan',
          image:
            'https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          role: 'user',
          coins: 0,
          money: 0,
          request: 0,
          referralCode: referralCode,
          referralPoints: 0,
          freeClaim: false,
        },
        { merge: true }
      );
      const checkQueries = qs.stringify(
        {
          filters: {
            email: {
              $eq: email,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${checkQueries}`
      );

      if (data?.data.length == 0) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles`,
          {
            data: {
              firstName: names[0],
              lastName: names[1],
              email: email,
              phoneNo: '',
              birthDay: '12 Jan',
              image:
                'https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100',
              role: 'user',
              coins: 0,
              money: 0,
              request: 0,
              referralCode: referralCode,
              referralPoints: 0,
              freeClaim: false,
            },
          }
        );
        const newData = {
          coins: 0,
          money: 0,
          activity: '',
          type: 'User Login',
        };

        const userInfo = {
          firstName: names[0],
          lastName: names[1],
          email: email,
        };

        await SetUserHistory(userInfo, newData);
      }
    }
  } catch (error) {
    console.error(error);
    toast.error(`🚨 ${error.message}🚨`);
  }
};
