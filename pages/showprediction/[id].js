import { Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import { useUser } from '../../utils/auth/userContext';

import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import NewOneMatchPredictions from '../../components/showpredictions/new.oneprediction.component';
import { BiArrowBack } from 'react-icons/bi';
import { useUser } from '../../utils/auth/userContext';
const ShowUserPredictions = ({ data }) => {
  const { user } = useUser();
  const router = useRouter();
  // console.log('data :>> ', data);
  const [userMatches, setUserMatches] = useState([]);
  // const [finalSet, setFinalSet] = useState([]);
  // console.log('userMatches :>> ', userMatches);

  // **********RESTORE*************************
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [user]);
  // **********RESTORE*************************
  useEffect(() => {
    if (userMatches.length == 0) {
      const userMatch = data.filter(
        (value) => value?.attributes?.email == user?.email
      );
      setUserMatches(userMatch);
      // let set = new Set();
      // userMatch?.forEach((elem) => {
      //   set.add(elem?.attributes?.uniqueId);
      // });
      // setFinalSet(Array.from(set));
    }

    // console.log('new set');
    // let finalSet = [...set];
  }, []);

  let set = new Set();
  userMatches?.forEach((elem) => {
    set.add(elem?.attributes?.uniqueId);
  });

  let finalSet = [...set];

  // console.log('finalSet :>> ', finalSet);

  return (
    <Layout name='matches predictions'>
      <NavHeader />
      <div className='mx-4 flex w-full'>
        <Button
          leftIcon={<BiArrowBack />}
          variant='ghost'
          onClick={() => router.push('/showprediction')}
        >
          Back
        </Button>
      </div>
      <Text className='mx-2 py-4 text-center text-2xl font-bold sm:text-4xl'>
        Matches Predictions
      </Text>
      <div className='my-4 mx-auto max-w-xl p-1 flex flex-wrap gap-6 w-fit justify-center'>
        {finalSet.map((elem) => (
          <NewOneMatchPredictions
            key={elem}
            uniqueId={elem}
            data={userMatches}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ShowUserPredictions;

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches/${params.id}?populate=*`
  );
  return {
    props: {
      data: data?.data?.attributes?.user_matches?.data,
    },
    // revalidate: 5,
  };
}
