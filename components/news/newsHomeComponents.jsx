import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import DatabaseFeedComponent from './databaseData/databasefeed.component';
import GetNewsFirestore from '../../utils/news/getNewsFirestore';

const NewsHomeComponents = () => {
  const [footballNews, setFootballNews] = useState([]);
  const [transferNews, setTransferNews] = useState([]);
  const [uefaNews, setUefaNews] = useState([]);

  const {
    isLoading: databaseLoading,
    data: databaseData,
    isSuccess,
    dataUpdatedAt,
  } = useQuery('getNewsFromFirestore', async () => await GetNewsFirestore());

  // console.log('databaseData :>> ', databaseData);

  useEffect(() => {
    let newArr1 = [];
    let newArr2 = [];
    let newArr3 = [];

    if (
      isSuccess &&
      typeof (databaseData !== null) &&
      Object?.keys(databaseData).length !== 0
    ) {
      databaseData.football.forEach((doc) => newArr1.push(doc.data()));
      setFootballNews(newArr1);
      databaseData.transfer.forEach((doc) => newArr2.push(doc.data()));
      setTransferNews(newArr2);
      databaseData.uefa.forEach((doc) => newArr3.push(doc.data()));
      setUefaNews(newArr3);
    }
  }, [isSuccess, dataUpdatedAt, databaseData]);

  return (
    <div className='mx-4 flex flex-col space-y-4 py-7'>
      <div className='tab-section'>
        <DatabaseFeedComponent
          isSuccess={isSuccess}
          databaseLoading={databaseLoading}
          footballNews={footballNews}
          transferNews={transferNews}
          uefaNews={uefaNews}
        />
      </div>
    </div>
  );
};

export default NewsHomeComponents;
