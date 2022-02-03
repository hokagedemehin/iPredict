// import { Button, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from 'react';
import selectedMacthesForPrediction from '../../utils/prediction/selectedMacthesForPrediction';
import MatchListComponent from './matchlist.component';
import NoMatchListComponent from './nomatchlist.component';
// import { useCollection } from "react-firebase-hooks/firestore";
// import { collection } from "firebase/firestore";
// import { db } from "../../utils/firebase/firebase";
import { Button, Skeleton } from '@chakra-ui/react';
import { GiSoccerBall } from 'react-icons/gi';
import { ImBlocked } from 'react-icons/im';
import addPredictionToFirestore from '../../utils/prediction/addPredictionToFirestore';
import { useUser } from '../../utils/auth/userContext';
import { ToastContainer } from 'react-toastify';
// import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from 'react-query';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

const PredictAndWinComponent = () => {
  const [matchSelect, setMatchSelect] = useState([]);
  const [formValue, setFormValue] = useState([]);
  // console.log("matchselect UI: ", matchSelect);
  // console.log("formValue: ", formValue);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userDoc } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  // const [value] = useCollection(collection(db, "MatchesSelected"), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  const {
    isLoading: isLoadings,
    data,
    isSuccess,
    dataUpdatedAt,
  } = useQuery(
    'allselectedMatches',
    async () => await selectedMacthesForPrediction()
  );

  // console.log('data', Object?.keys(data).length);
  // console.log('data', data);
  // console.log("dataUpdatedAt", dataUpdatedAt);

  useEffect(() => {
    if (
      isSuccess &&
      typeof (data !== null) &&
      Object?.keys(data).length !== 0
    ) {
      const newArr = [];

      data?.forEach((doc) => newArr.push(doc.data()));
      // if (newArr.length !== 0) {
      setMatchSelect(newArr);
      // }
    }
  }, [isSuccess, dataUpdatedAt]);

  // console.log("form Value: ", Object.keys(formValue).length);
  // console.log("match Select:", matchSelect.length);
  // console.log(Object.keys(formValue).length / matchSelect.length);
  const handleSubmission = async () => {
    const checkVal = Object.keys(formValue).length / matchSelect.length;
    if (checkVal !== 2) {
      toast.error('❌ All predictions are required');
    } else if (matchTime <= rightNow) {
      toast.error('🚧 Prediction is closed');
    } else if (userDoc?.coins < 20) {
      toast.error('💰 Insufficient coins balance');
    } else {
      for (const [key, value] of Object.entries(formValue)) {
        const homeVal = matchSelect.filter((item) => item.homeName === key);
        if (homeVal.length !== 0) {
          homeVal[0].homeGoal = Number(value);
        }

        // console.log("new Val: ", homeVal);
      }
      for (const [key, value] of Object.entries(formValue)) {
        const awayVal = matchSelect.filter((item) => item.awayName === key);
        if (awayVal.length !== 0) {
          awayVal[0].awayGoal = Number(value);
        }

        // console.log("new away: ", awayVal);
      }
      // console.log("new Match Select: ", matchSelect);
      await addPredictionToFirestore(
        matchSelect,
        setIsLoading,
        user,
        userDoc
        // setFormValue
      );
    }
    // alert('this action happened');
    // console.log('hakked');
    onClose();
    // setIsLoading(false);
  };
  // value?.docs?.map((doc) => console.log(doc.data()));
  // const d = new Date();
  // let day = d.getDay();
  // const da = moment("2022-01-15T12:30:00+00:00").format("h:mm:ss a");
  // const da1 = moment("2022-01-15T17:30:00+00:00").format("h:mm:ss a");
  // const dc1 = new Date("2022-01-15T15:00:00+00:00");
  // const dc2 = new Date("2022-01-15T15:00:00+00:00");
  // const dc3 = new Date("2022-01-15T17:30:00+00:00");
  // const dc4 = new Date("2022-01-15T12:30:00+00:00");

  // console.log(dc1.getTime());
  // console.log(dc2.getTime());
  // console.log(dc3.getTime());
  // console.log(dc4.getTime());
  // console.log(da);
  // console.log(da1);
  // console.log(da < da1);

  const val = matchSelect.sort((a, b) => {
    // const da = new Date(a.matchDate);
    // const db1 = new Date(b.matchDate);
    // console.log(da);
    // console.log(db1);
    // return db1.getTime() - da.getTime();
    return new Date(a.matchDate) - new Date(b.matchDate);
  });
  // console.log(val[0]);
  const matchTime = new Date(val[0]?.matchDate).getTime();
  const rightNow = new Date().getTime();
  // console.log(matchTime);
  // console.log();
  return (
    <div className='mx-2'>
      <div className='flex flex-col mt-5 max-w-2xl mx-auto shadow-md rounded-lg'>
        {matchSelect.length == 0 && isLoadings && (
          <Skeleton className='flex items-center justify-center mb-4 mt-2 h-28 w-full'>
            <p fontSize='lg' fontWeight='bold'>
              New matches are coming soon
            </p>
          </Skeleton>
        )}
        {isSuccess &&
          matchSelect.map((matches, index) => (
            <MatchListComponent
              key={index}
              matches={matches}
              setFormValue={setFormValue}
              formValue={formValue}
              setMatchSelect={setMatchSelect}
              // matchSelect={matchSelect}
            />
          ))}

        {matchSelect.length == 0 && !isLoadings && <NoMatchListComponent />}

        {/* <MatchListComponent key={index} finalData={finalData} /> */}
      </div>
      <div>
        {rightNow >= matchTime || matchSelect.length == 0 ? (
          <div className='flex my-5 max-w-2xl mx-auto shadow-sm'>
            <Button
              leftIcon={<ImBlocked />}
              colorScheme='blackAlpha'
              variant='outline'
              isFullWidth
              fontSize='xl'
              isDisabled
            >
              Prediction Closed
            </Button>
          </div>
        ) : (
          <div className='flex my-5 max-w-2xl mx-auto shadow-sm'>
            <Button
              leftIcon={<GiSoccerBall />}
              colorScheme='teal'
              variant='solid'
              isFullWidth
              fontSize='xl'
              // onClick={handleSubmission}
              onClick={() => setIsOpen(true)}
              isLoading={isOpen}
              loadingText='Loading'
              spinnerPlacement='end'
            >
              Submit Prediction (20 coins)
            </Button>
          </div>
        )}
      </div>
      <div>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Submit Predictions
            </AlertDialogHeader>
            <AlertDialogBody>
              20 coins will be deducted from your wallet, do you want to
              proceed?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                colorScheme='red'
                variant='outline'
                onClick={onClose}
              >
                No
              </Button>
              <Button
                colorScheme='teal'
                onClick={() => handleSubmission()}
                ml={3}
                isLoading={isLoading}
                loadingText='Sending'
                spinnerPlacement='end'
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PredictAndWinComponent;
