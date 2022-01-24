// import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useUser } from '../../utils/auth/userContext';
import GetMyPrediction from '../../utils/myprediction/getmyprediction';
import MyPredictionsEmptyComponent from '../emptypages/mypredictions.empty';
import AllMatchesPredictions from './allmatchespredictions.component';
import AllMatchesSkeletonPredictions from './allmatchesskeleton.component';
// import EachPrediction from "./eachprediction";

const ShowPredictionComponent = () => {
  const { user } = useUser();

  const [predictedMatch, setPredictedMatch] = useState([]);

  // const getMatch = async () => {
  //   await GetMyPrediction(user, setPredictedMatch);
  // };

  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    ['allselectedMatches', user],
    async () => await GetMyPrediction(user),
    { enabled: !!user }
  );
  // console.log('data :>> ', data);

  useEffect(() => {
    if (isSuccess) {
      const newArr = [];

      data?.forEach((doc) => newArr.push(doc.data()));
      // if (newArr.length !== 0) {
      setPredictedMatch(newArr);
      // }
    }
  }, [isSuccess, dataUpdatedAt]);
  // console.log("predicted Match: ", predictedMatch);
  // console.log("predict Date: ", predictDate);

  return (
    <div>
      <div className=' mx-2 '>
        {isLoading &&
          [0, 1, 2, 3].map((match, index) => (
            <AllMatchesSkeletonPredictions key={index} match={match} />
          ))}
        {isSuccess &&
          predictedMatch.map((match, index) => (
            <AllMatchesPredictions key={index} match={match} />
          ))}
        {predictedMatch.length === 0 && isSuccess && (
          <MyPredictionsEmptyComponent />
        )}
      </div>
    </div>
  );
};

export default ShowPredictionComponent;
