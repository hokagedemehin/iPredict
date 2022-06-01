// import {
//   collection,
//   doc,
//   getDoc,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
const qs = require('qs');
import axios from 'axios';
import SetUserHistory from './setUserHistory';

const withdrawalrequest = async (
  setWithdrawLoading,
  formValue,
  userDoc,
  setUserDoc,
  setFormValue
) => {
  try {
    setWithdrawLoading(true);
    // const userRef = doc(db, 'Users', uid);
    // const userCoinsData = await getDoc(userRef);
    // const userData = userCoinsData.data();
    // // console.log('userData', userData, userCoinsData.id);
    // // const userMoney = userCoinsData.data().money;
    // await updateDoc(userRef, {
    //   money: 0,
    //   request: userMoney,
    //   updatedAt: serverTimestamp(),
    // });
    // const newWithdraw = doc(collection(db, 'Withdraws'));
    // await setDoc(newWithdraw, {
    //   ID: newWithdraw.id,
    //   email: userData?.email,
    //   amount: userData?.money,
    //   fullName: formValue?.fullname,
    //   accountNumber: formValue?.accountnumber,
    //   bankName: formValue?.bankname,
    //   phoneNumber: formValue?.phonenumber,
    //   userID: userCoinsData?.id,
    //   transferred: 'no',
    //   createdAt: serverTimestamp(),
    // });

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

    const userMoney = data?.data[0].attributes?.money;

    const id = data?.data[0].id;

    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/${id}`,
      {
        data: {
          request: userMoney,
          money: 0,
        },
      }
    );

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/withdraws`, {
      data: {
        fullName: formValue?.fullname,
        email: userDoc?.email,
        amount: userMoney,
        accountNumber: formValue?.accountnumber,
        bankName: formValue?.bankname,
        phoneNumber: formValue?.phonenumber,
        transfer: 'no',
        user_profile: id,
      },
    });

    const newData = {
      coins: 0,
      money: userMoney,
      activity: '',
      type: 'Withdrawal Request',
    };

    await SetUserHistory(userDoc, newData);

    setUserDoc({ ...userDoc, request: userMoney, money: 0 });
    setFormValue({
      fullname: '',
      accountnumber: '',
      bankname: '',
      phonenumber: '',
    });
  } catch (error) {
    console.error(error);
  } finally {
    setWithdrawLoading(false);
  }
};

export default withdrawalrequest;
