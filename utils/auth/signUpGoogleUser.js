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
      },
      { merge: true }
    );
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
      const newCoins = userCoins + 2;
      await updateDoc(referralUserRef, {
        coins: +newCoins,
        updatedAt: serverTimestamp(),
        referralPoints: increment(1),
      });
    });
    // toast.success(`🚨 ${result.user}🚨`);
  } catch (error) {
    console.error(error);
    toast.error(`🚨 ${error.message}🚨`);
  }
};
