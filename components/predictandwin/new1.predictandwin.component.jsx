import React, { useEffect, useState } from 'react';
import NoMatchListComponent from './nomatchlist.component';
import { Button, Skeleton } from '@chakra-ui/react';
import { GiSoccerBall } from 'react-icons/gi';
import { ImBlocked } from 'react-icons/im';
import { useUser } from '../../utils/auth/userContext';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogContent,
//   AlertDialogOverlay,
// } from '@chakra-ui/react';
import NewMatchListComponent from './new.matchlist.component';
import axios from 'axios';
import { nanoid } from 'nanoid';
import DeductCoinsFromWallet from '../../utils/wallet/deductCoinsFromWallet';
import SetUserHistory from '../../utils/wallet/setUserHistory';
import { useRouter } from 'next/router';

const New1PredictAndWinComponent = ({ newMatches }) => {
  const router = useRouter();
  const [matches, setmatches] = useState([]);
  const [userPrediction, setUserPrediction] = useState([]);
  const newData = newMatches?.matches?.data;

  useEffect(() => {
    if (matches.length == 0) {
      newData.forEach((doc) => {
        let newObj = {
          id: doc?.id,
          awayLogo: doc?.attributes?.awayLogo,
          awayName: doc?.attributes?.awayName,
          homeLogo: doc?.attributes?.homeLogo,
          homeName: doc?.attributes?.homeName,
          matchId: doc?.attributes?.matchId,
          matchDate: doc?.attributes?.matchDate,
          result: doc?.attributes?.result,
          userpredict: '',
        };
        setmatches((prev) => [...prev, newObj]);
      });
    }
  }, [newMatches]);

  const [isLoading, setIsLoading] = useState(false);
  const { userDoc, setUserDoc } = useUser();
  // const [isOpen, setIsOpen] = useState(false);
  // const onClose = () => setIsOpen(false);
  // const cancelRef = useRef();

  // const handleClick = (e) => {
  //   const checkVal = matches.length == userPrediction.length;
  //   e.preventDefault();
  //   if (userDoc?.coins < 20) {
  //     toast.error('💰 Insufficient coins balance');
  //   } else if (!checkVal) {
  //     toast.error('❌ All predictions are required');
  //   } else {
  //     setIsOpen(true);
  //   }
  // };

  const handleSubmission = async () => {
    // const checkVal = Object.keys(formValue).length / matchSelect.length;
    const checkVal = matches.length == userPrediction.length;
    if (!checkVal) {
      toast.error('❌ All predictions are required');
    } else if (matchTime <= rightNow) {
      toast.error('🚧 Prediction is closed');
    } else if (userDoc?.coins < 20) {
      toast.error('💰 Insufficient coins balance');
    } else {
      try {
        setIsLoading(true);
        await DeductCoinsFromWallet(20, userDoc, setUserDoc);
        const newData = {
          coins: 20,
          money: 0,
          activity: '',
          type: 'Match Prediction',
        };

        await SetUserHistory(userDoc, newData);

        const uniqueId = nanoid();
        userPrediction.forEach(async (predict) => {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-matches`,
            {
              data: {
                awayLogo: predict?.awayLogo,
                awayName: predict?.awayName,
                homeLogo: predict?.homeLogo,
                homeName: predict?.homeName,
                selectId: newMatches?.id,
                strapiMatchId: predict?.id,
                matchDate: predict?.matchDate,
                matchId: predict?.matchId,
                result: predict?.result,
                userpredict: predict?.userpredict,
                selected_match: newMatches?.id,
                firstName: userDoc?.firstName,
                lastName: userDoc?.lastName,
                email: userDoc?.email,
                uniqueId: uniqueId,
              },
            }
          );
        });
        router.push(`/showprediction/${newMatches?.id}`);
        // setUserPrediction([]);
        toast.success('✅Saved successfully');
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    // onClose();
  };

  const val = matches.sort((a, b) => {
    return new Date(a.matchDate) - new Date(b.matchDate);
  });
  // console.log(val[0]);
  const matchTime = new Date(val[0]?.matchDate).getTime();
  const rightNow = new Date().getTime();

  return (
    <div className='mx-2'>
      <div className='flex flex-col mt-5 max-w-2xl mx-auto space-y-4'>
        {matches.length == 0 && (
          <Skeleton className='flex items-center justify-center mb-4 mt-2 h-28 w-full'>
            <p fontSize='lg' fontWeight='bold'>
              New matches are coming soon
            </p>
          </Skeleton>
        )}

        {matches.length > 0 &&
          matches.map((match) => (
            <NewMatchListComponent
              key={match.id}
              match={match}
              userPrediction={userPrediction}
              setUserPrediction={setUserPrediction}
            />
          ))}

        {matches.length == 0 && <NoMatchListComponent />}
      </div>
      <div>
        {rightNow >= matchTime || matches.length == 0 ? (
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
              onClick={() => {
                handleSubmission();
              }}
              isLoading={isLoading}
              loadingText='Loading'
              spinnerPlacement='end'
            >
              Submit Prediction (20 coins)
            </Button>
          </div>
        )}
      </div>
      {/* <div>
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
      </div> */}
      <ToastContainer />
    </div>
  );
};

export default New1PredictAndWinComponent;
