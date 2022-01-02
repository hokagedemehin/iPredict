import React from "react";

import OneMatchPredictions from "./oneprediction.component";

const AllMatchesPredictions = ({ match }) => {
  // console.log("all matches: ", match);

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center mx-4  my-2 p-2 ring-1 ring-gray-200 rounded-md">
      {match &&
        match?.predictID.map((oneDate, index) => (
          <OneMatchPredictions
            key={index}
            oneDate={oneDate}
            matchID={match?.matchID}
          />
        ))}
    </div>
  );
};

export default AllMatchesPredictions;
