import axios from 'axios';

const NewGetSelectedMatches = async (
  selectedMatches,
  myPredictions,
  setMyPredictions
) => {
  let newArr = [];
  // if (myPredictions.length == 0) {
  selectedMatches.forEach(async (selection) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches/${selection}`
      );
      newArr.push(data?.data);
      // setMyPredictions([...myPredictions, data?.data]);
      setMyPredictions(newArr);
    } catch (error) {
      console.error(error);
    }
    // console.log('newArr :>> ', newArr);
  });
  // }
  // setMyPredictions(newArr);
  // return newArr;
};

export default NewGetSelectedMatches;
