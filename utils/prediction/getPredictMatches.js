import axios from 'axios';

const qs = require('qs');

const GetPredictMatches = async () => {
  const query = qs.stringify(
    {
      filters: {
        latest: {
          $eq: true,
        },
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches?${query}`
  );

  // console.log(data);

  let newData = {
    id: data?.data[0]?.id,
    ...data?.data[0]?.attributes,
  };

  return newData;
};

export default GetPredictMatches;
