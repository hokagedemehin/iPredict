// import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useUser } from "../../utils/auth/userContext";
import GetMyPrediction from "../../utils/myprediction/getmyprediction";
import AllMatchesPredictions from "./allmatchespredictions.component";
// import EachPrediction from "./eachprediction";

const ShowPredictionComponent = () => {
  const { user } = useUser();

  const [predictedMatch, setPredictedMatch] = useState([]);

  const getMatch = async () => {
    await GetMyPrediction(user, setPredictedMatch);
  };
  useEffect(() => {
    if (user) {
      getMatch();
    }
    //
  }, [user]);
  // console.log("predicted Match: ", predictedMatch);
  // console.log("predict Date: ", predictDate);

  return (
    <div>
      <div className="  ">
        {predictedMatch &&
          predictedMatch.map((match, index) => (
            <AllMatchesPredictions key={index} match={match} />
          ))}
      </div>
    </div>
  );
};

export default ShowPredictionComponent;
