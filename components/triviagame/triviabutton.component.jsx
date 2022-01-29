import { Button, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { BsCoin } from 'react-icons/bs';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import TriviaCoins from '../../utils/wallet/triviaCoins';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const TriviaHomeButton = ({ elem, user, userDoc }) => {
  // console.log('userDoc :>> ', userDoc);
  const router = useRouter();
  const name = [
    'easyway',
    'confam',
    'originality',
    'excellent',
    'chairman',
    'presido',
  ];

  const price = ['200', '500', '1000', '2000', '5000', '10,000'];
  const coins = ['5', '80', '150', '300', '500', '800'];
  const color = [
    '#B25B90',
    '#8A2D65',
    '#9F1616',
    '#670333',
    '#FF0000',
    '#B90000',
  ];
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    if (userDoc?.coins < coins[elem]) {
      toast.error('💰 Insufficient coins balance');
    } else {
      setIsOpen(true);
    }
  };
  const handleSubmission = async () => {
    // setIsLoading(true);
    if (userDoc?.coins >= coins[elem]) {
      await TriviaCoins(setIsLoading, coins[elem], user, userDoc);
      if (!isLoading) {
        router.push(
          `/triviagame/quiz/${10}/${name[elem]}/${price[elem]}/${coins[elem]}`
        );
      }
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col shadow-md shadow-[${color[elem]}] rounded-xl ring-1 p-1 cursor-pointer`}
        onClick={(e) => {
          handleClick(e);
        }}

        // onClick={() => setIsOpen(true)}
      >
        <div
          className={`px-5 py-3 ${
            name[elem] == 'originality' || name[elem] == 'chairman'
              ? 'text-[12px]'
              : 'text-sm'
          } text-center font-bold bg-[${color[elem]}]  rounded-xl text-white`}
        >
          {name[elem].toUpperCase()}
        </div>
        <div className='flex flex-col mb-3'>
          <Text className='font-bold text-xl text-center -mb-2'>WIN</Text>
          <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
            N{price[elem]}
          </Text>
          <Text fontSize='xs' className='font-bold text-xl text-center -mb-4'>
            10 Questions
          </Text>
          <Text fontSize='xs' className='font-bold text-xl text-center'>
            Time: 60sec
          </Text>
          <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
            <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
              <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
              <Text fontSize='xs' className='font-semibold'>
                {coins[elem]}
              </Text>
            </div>
            <Text className='text-[10px] text-white text-center flex items-center justify-center'>
              PLAY
            </Text>
          </div>
        </div>
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Start Game
          </AlertDialogHeader>
          <AlertDialogBody>
            {`${coins[elem]} coins will be deducted from your wallet, do you want to preoceed?`}
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
      <ToastContainer />
    </div>
  );
};

export default TriviaHomeButton;
