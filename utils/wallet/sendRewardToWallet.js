import { doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const SendRewardToWallet = async (money, uid) => {
  const userRef = doc(db, 'Users', uid);
  const userMoneyData = await getDoc(userRef);
  const userMoney = userMoneyData.data().money;
  const newMoney = userMoney + money;
  await updateDoc(userRef, {
    money: +newMoney,
    updatedAt: serverTimestamp(),
  });
  // toast.success('✅ Reward Received');
};

export default SendRewardToWallet;
