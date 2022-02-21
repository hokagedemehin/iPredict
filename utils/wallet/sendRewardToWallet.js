import { doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import SetUserHistory from './setUserHistory';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const SendRewardToWallet = async (money, uid, userDoc) => {
  const userRef = doc(db, 'Users', uid);
  const userMoneyData = await getDoc(userRef);
  const userMoney = userMoneyData.data().money;
  const newMoney = userMoney + money;
  await updateDoc(userRef, {
    money: +newMoney,
    updatedAt: serverTimestamp(),
  });
  const newData = {
    coins: 0,
    money: money,
    activity: '',
    type: 'Trivia Game Reward',
  };
  await SetUserHistory(userDoc, newData);
  // toast.success('✅ Reward Received');
};

export default SendRewardToWallet;
