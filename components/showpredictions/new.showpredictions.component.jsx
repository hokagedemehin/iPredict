import { Text } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useUser } from '../../utils/auth/userContext';

import NewGetMyPrediction from '../../utils/myprediction/newGetmyprediction';

import MyPredictionsEmptyComponent from '../emptypages/mypredictions.empty';
import AllMatchesSkeletonPredictions from './allmatchesskeleton.component';

const NewShowPredictionComponent = () => {
  const { user } = useUser();
  const router = useRouter();

  // const [predictedMatch, setPredictedMatch] = useState([]);
  const [myPredictions, setMyPredictions] = useState([]);

  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    ['allselectedMatches', user],
    async () => await NewGetMyPrediction(user),
    { enabled: !!user }
  );

  useEffect(() => {
    if (isSuccess) {
      // console.log('data :>> ', data);

      setMyPredictions(data);
    }
  }, [isSuccess, dataUpdatedAt]);

  // console.log('data :>> ', data);

  // console.log('myPredictions', myPredictions);

  return (
    <div>
      <div className=' mx-2 flex flex-wrap items-center justify-center gap-2'>
        {isLoading &&
          [0, 1, 2, 3].map((match, index) => (
            <AllMatchesSkeletonPredictions key={index} match={match} />
          ))}

        {isSuccess &&
          myPredictions.length !== 0 &&
          myPredictions.map((match, index) => (
            <div
              className='w-fit border cursor-pointer rounded-md p-2 shadow-md '
              key={index}
              // ref={btnRef}
              onClick={() => {
                router.push(`/showprediction/${match.id}`);
                // onOpen;
              }}
            >
              <Text>
                matches for{' '}
                {moment(match?.attributes?.date).format('MMMM Do YY')}{' '}
              </Text>
            </div>
          ))}
        {isSuccess && myPredictions.length === 0 && (
          <MyPredictionsEmptyComponent />
        )}
      </div>
    </div>
  );
};

export default NewShowPredictionComponent;
