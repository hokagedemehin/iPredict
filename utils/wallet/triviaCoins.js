import DeductCoinsFromWallet from './deductCoinsFromWallet';
import SetUserHistory from './setUserHistory';

const TriviaCoins = async (setIsLoading, coin, user, userDoc) => {
  try {
    const uid = user?.uid;
    setIsLoading(true);
    DeductCoinsFromWallet(+coin, uid);
    const newData = {
      coins: +coin,
      money: 0,
      activity: '',
      type: 'Start Trivia Quiz',
    };
    await SetUserHistory(userDoc, newData);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default TriviaCoins;
