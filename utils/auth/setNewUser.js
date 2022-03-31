import { auth, db } from '../firebase/firebase';
// import { useUser } from "../context/userContext";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SetNewUser = async (
  formValue,
  setIsLoading,
  referralCode,
  registerID
) => {
  // const email1 = formValue.email;
  // const password = formValue.password;

  // TODO: create a firestore document with the firstname, lastname, email and Password
  const firstName = formValue.firstName;
  const lastName = formValue.lastName;
  // console.log(formValue);
  try {
    setIsLoading(true);
    const response = await createUserWithEmailAndPassword(
      auth,
      formValue.email,
      formValue.password
    );
    // console.log(response);

    const { uid, email } = response.user;

    const docRef = doc(db, 'Users', uid);

    await setDoc(
      docRef,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNo: '',
        birthDay: '12 Jan',
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
      const newCoins = userCoins + 1;
      await updateDoc(referralUserRef, {
        coins: +newCoins,
        updatedAt: serverTimestamp(),
        referralPoints: increment(1),
      });
    });
  } catch (error) {
    console.error(error);
    toast.error('💥Something is wrong 😪😥💥');
  } finally {
    setIsLoading(false);
  }
};
