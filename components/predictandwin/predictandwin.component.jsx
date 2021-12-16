// import { Button, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import selectedMacthesForPrediction from "../../utils/prediction/selectedMacthesForPrediction";
import MatchListComponent from "./matchlist.component";
import NoMatchListComponent from "./nomatchlist.component";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";

const PredictAndWinComponent = () => {
  const [matchSelect, setMatchSelect] = useState([]);
  console.log("matchselect UI: ", matchSelect);
  // const [isLoading, setisLoading] = useState(false);
  // const [finalData, setFinalData] = useState(null);
  // console.log(object)
  // const getMatches = () => {
  //   // setMatchSelect([]);
  //   selectedMacthesForPrediction(matchSelect, setMatchSelect);
  // };
  const [value] = useCollection(collection(db, "MatchesSelected"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    selectedMacthesForPrediction(setMatchSelect);
  }, [value]);

  // value?.docs?.map((doc) => console.log(doc.data()));
  return (
    <div>
      <div className="flex flex-col mt-5 mx-3 shadow-md rounded-lg">
        {matchSelect.length == 0 ? (
          <NoMatchListComponent />
        ) : (
          matchSelect.map((matches, index) => (
            <MatchListComponent
              key={index}
              matches={matches}
              // setMatchSelect={setMatchSelect}
              // matchSelect={matchSelect}
            />
          ))
        )}

        {/* <MatchListComponent key={index} finalData={finalData} /> */}
      </div>
    </div>
  );
};

export default PredictAndWinComponent;
