import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default EditUserProfile;
