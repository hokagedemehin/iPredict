// import { Button, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import selectedMacthesForPrediction from "../../utils/prediction/selectedMacthesForPrediction";
import MatchListComponent from "./matchlist.component";
import NoMatchListComponent from "./nomatchlist.component";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";
import { Button } from "@chakra-ui/react";
import { GiSoccerBall } from "react-icons/gi";
// import addPredictionToFirestore from "../../utils/prediction/addPredictionToFirestore";

const PredictAndWinComponent = () => {
  const [matchSelect, setMatchSelect] = useState([]);
  const [formValue, setFormValue] = useState([]);
  console.log("matchselect UI: ", matchSelect);
  console.log("formValue: ", formValue);
  const [isLoading, setisLoading] = useState(false);
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

  const handleSubmission = async () => {
    // await addPredictionToFirestore(setisLoading, matchSelect);
    // console.log("form Value: ", formValue);
    // console.log(Object.keys(formValue));
    for (const [key, value] of Object.entries(formValue)) {
      const homeVal = matchSelect.filter((item) => item.homeName === key);
      if (homeVal.length !== 0) {
        homeVal[0].homeGoal = Number(value);
      }

      console.log("new Val: ", homeVal);
    }
    for (const [key, value] of Object.entries(formValue)) {
      const awayVal = matchSelect.filter((item) => item.awayName === key);
      if (awayVal.length !== 0) {
        awayVal[0].awayGoal = Number(value);
      }

      console.log("new away: ", awayVal);
    }
    console.log("new Match Select: ", matchSelect);
    setisLoading(false);
  };
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
              setFormValue={setFormValue}
              formValue={formValue}
              setMatchSelect={setMatchSelect}
              // matchSelect={matchSelect}
            />
          ))
        )}

        {/* <MatchListComponent key={index} finalData={finalData} /> */}
      </div>
      <div className="flex my-5 mx-2 shadow-sm">
        <Button
          leftIcon={<GiSoccerBall />}
          colorScheme="teal"
          variant="solid"
          isFullWidth
          fontSize="xl"
          onClick={handleSubmission}
          isLoading={isLoading}
          loadingText="Saving"
          spinnerPlacement="end"
        >
          Submit Prediction
        </Button>
      </div>
    </div>
  );
};

export default PredictAndWinComponent;
