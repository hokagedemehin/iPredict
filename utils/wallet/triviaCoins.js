import DeductCoinsFromWallet from './deductCoinsFromWallet';

const TriviaCoins = async (setIsLoading, coin, user) => {
  try {
    const uid = user?.uid;
    setIsLoading(true);
    DeductCoinsFromWallet(coin, uid);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default TriviaCoins;
