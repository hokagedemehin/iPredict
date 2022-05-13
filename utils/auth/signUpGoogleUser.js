import { auth, db } from '../firebase/firebase';
// import { useUser } from "../context/userContext";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from 'firebase/firestore';
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

export const SignUpGoogleUser = async (referralCode, registerID) => {
  // TODO: create a firestore document with the firstname, lastname, email and Password
  // console.log(uid, displayName, email);

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const { uid, displayName, email } = result.user;
    const docRef = doc(db, 'Users', uid);

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
        type: 'New Registration',
      };

      const userInfo = {
        firstName: names[0],
        lastName: names[1],
        email: email,
      };

      await SetUserHistory(userInfo, newData);
    }

    // Get the user with the correct refferal code and increment their points and also give 5 coins
    const referralRef = collection(db, 'Users');
    const referralQuery = query(
      referralRef,
      where('referralCode', '==', registerID)
    );
    const referralDoc = await getDocs(referralQuery);
    referralDoc.forEach(async (docu) => {
      const referralUserRef = doc(db, 'Users', docu.id);
      const userCoins = docu.data().coins;
      const newCoins = userCoins + 1;
      await updateDoc(referralUserRef, {
        coins: +newCoins,
        updatedAt: serverTimestamp(),
        referralPoints: increment(1),
      });
    });

    const queries = qs.stringify(
      {
        filters: {
          referralCode: {
            $eq: registerID,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const { data: referralData } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${queries}`
    );

    if (referralData.data.length > 0) {
      let updateCoins = referralData.data[0].attributes.coins + 1;
      let updatePoints = referralData.data[0].attributes.referralPoints + 1;
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/${referralData.data[0].id}`,
        {
          data: {
            coins: updateCoins,
            referralPoints: updatePoints,
          },
        }
      );

      const newData = {
        coins: 0,
        money: 0,
        activity: '',
        type: 'Registration Referral',
      };

      const newUser = referralData.data[0].attributes;

      await SetUserHistory(newUser, newData);
    }
    // toast.success(`🚨 ${result.user}🚨`);
  } catch (error) {
    console.error(error);
    toast.error(`🚨 ${error.message}🚨`);
  }
};
