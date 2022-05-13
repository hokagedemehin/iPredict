const qs = require('qs');
import axios from 'axios';
const GetBanner = async () => {
  // const collectionRef = doc(db, `Prize&People`, 'values');

  // const collecionData = await getDoc(collectionRef);

  const query = qs.stringify(
    {
      sort: ['id:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict-banners?${query}`
  );

  return data?.data[0];
  // return collecionData.data();
};

export default GetBanner;
