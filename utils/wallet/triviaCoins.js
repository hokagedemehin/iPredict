import DeductCoinsFromWallet from './deductCoinsFromWallet';
import SetUserHistory from './setUserHistory';

const TriviaCoins = async (setIsLoading, coin, user, userDoc, setUserDoc) => {
  try {
    // const email = userDoc?.email;
    setIsLoading(true);
    DeductCoinsFromWallet(+coin, userDoc, setUserDoc);
    const newData = {
      coins: +coin,
      money: 0,
      activity: '',
      type: 'Start Trivia Quiz',
    };
    await SetUserHistory(userDoc, newData);
    // setUserDoc({...userDoc, coins});
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default TriviaCoins;
