import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const withdrawalrequest = async (setWithdrawLoading, formValue, uid) => {
  try {
    setWithdrawLoading(true);
    const userRef = doc(db, 'Users', uid);
    const userCoinsData = await getDoc(userRef);
    const userData = userCoinsData.data();
    // console.log('userData', userData, userCoinsData.id);
    const userMoney = userCoinsData.data().money;
    await updateDoc(userRef, {
      money: 0,
      request: userMoney,
      updatedAt: serverTimestamp(),
    });
    const newWithdraw = doc(collection(db, 'Withdraws'));
    await setDoc(newWithdraw, {
      ID: newWithdraw.id,
      email: userData?.email,
      amount: userData?.money,
      fullName: formValue?.fullname,
      accountNumber: formValue?.accountnumber,
      bankName: formValue?.bankname,
      phoneNumber: formValue?.phonenumber,
      userID: userCoinsData?.id,
      transferred: 'no',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  } finally {
    setWithdrawLoading(false);
  }
};

export default withdrawalrequest;
