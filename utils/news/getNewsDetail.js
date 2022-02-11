import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const GetNewsDetail = async (section, newsID) => {
  try {
    // const capitalizeSection = section[0].toUpperCase() + section.slice(1);
    // console.log(capitalizeSection);
    const newsDetailRef = doc(db, 'News&Transfers', 'allNews', section, newsID);
    const newsdata = await getDoc(newsDetailRef);
    // console.log('newsdata :>> ', newsdata.data());
    return newsdata;
  } catch (error) {
    console.error(error);
  }
};

export default GetNewsDetail;
