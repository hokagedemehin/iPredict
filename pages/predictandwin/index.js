import { Heading, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import BannerPredictAndWin from '../../components/predictandwin/banner.component';
import NewPredictAndWinComponent from '../../components/predictandwin/new.predictandwin.component';
// import New1PredictAndWinComponent from '../../components/predictandwin/new1.predictandwin.component';
// import PredictAndWinComponent from '../../components/predictandwin/predictandwin.component';
import { useUser } from '../../utils/auth/userContext';
import GetPredictMatches from '../../utils/prediction/getPredictMatches';
const qs = require('qs');

const PredictAndWinPage = ({ data: initialPredictionData, coins }) => {
  const { user } = useUser();
  const router = useRouter();

  // console.log('coins :>> ', coins);

  const { data, isLoading, isSuccess, dataUpdatedAt } = useQuery(
    ['predictionmatches'],
    async () => await GetPredictMatches(),
    {
      initialData: initialPredictionData,
    }
  );
  const { data: newPredictionCoins } = useQuery(
    ['prediction-matches-coins'],
    async () => {
      const queryPredictionCoins = qs.stringify(
        {
          sort: ['id:desc'],

          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict-banners?${queryPredictionCoins}`
      );
      return data?.data[0]?.attributes?.coins;
    },
    {
      initialData: coins,
    }
  );

  // console.log('data :>> ', data);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <Layout name='matches' desc='I-Predict and Win'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          {/* <Heading>Predict & Win</Heading> */}
          <Heading className='text-teal-500'>{data?.name}</Heading>
        </div>
        <div className='mx-2'>
          <BannerPredictAndWin />
        </div>
        {isLoading && (
          <Skeleton className='flex items-center justify-center mb-4 mt-2 h-28 w-full'>
            <p fontSize='lg' fontWeight='bold'>
              New matches are coming soon
            </p>
          </Skeleton>
        )}
        {/* <PredictAndWinComponent newMatches={data} /> */}
        <div className='flex text-center w-full justify-center'>
          {/* <Heading className='text-teal-600'>{data?.name}</Heading> */}
        </div>
        {isSuccess && (
          <NewPredictAndWinComponent
            newMatches={data}
            coins={newPredictionCoins}
            dataUpdatedAt={dataUpdatedAt}
          />
        )}
        {/* {isSuccess && <New1PredictAndWinComponent newMatches={data} />} */}
      </div>
    </Layout>
  );
};

export default PredictAndWinPage;

export async function getStaticProps() {
  const queryPredictionCoins = qs.stringify(
    {
      sort: ['id:desc'],

      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data: predictionCoinsData } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict-banners?${queryPredictionCoins}`
  );

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

  // console.log(predictionCoinsData?.data[0]?.attributes);

  let newData = {
    id: data?.data[0]?.id,
    ...data?.data[0]?.attributes,
  };

  return {
    props: {
      data: newData,
      coins: predictionCoinsData?.data[0]?.attributes?.coins,
    },
    revalidate: 5,
  };
}
