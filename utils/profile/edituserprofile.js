import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
const qs = require('qs');
import axios from 'axios';
import SetUserHistory from '../wallet/setUserHistory';

const EditUserProfile = async (formValue, user, setIsLoading) => {
  try {
    setIsLoading(true);
    const userRef = doc(db, 'Users', user?.uid);
    await updateDoc(userRef, {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phoneNo: formValue.phoneNo,
      birthDay: formValue.birthDay,
      updatedAt: serverTimestamp(),
    });

    const query = qs.stringify({
      filters: {
        email: {
          $eq: user?.email,
        },
      },
    });

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${query}`
    );

    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/${data?.data[0].id}`,
      {
        data: {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          phoneNo: formValue.phoneNo,
          birthDay: formValue.birthDay,
        },
      }
    );

    const userInfo = {
      email: user?.email,
      firstName: formValue?.firstName,
      lastName: formValue?.lastName,
    };

    const newData = {
      coins: 0,
      money: 0,
      activity: '',
      type: 'Profile Update',
    };

    await SetUserHistory(userInfo, newData);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default EditUserProfile;
