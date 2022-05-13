import axios from 'axios';
const qs = require('qs');

const NewGetMyPrediction = async (user) => {
  const query = qs.stringify(
    {
      filters: {
        // email: {
        //   $eq: user?.email,
        // },
        user_matches: {
          email: {
            $eq: user?.email,
          },
        },
      },
      sort: ['date:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-matches?${query}`
  // );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches?${query}`
  );
  return data?.data;
};

export default NewGetMyPrediction;
