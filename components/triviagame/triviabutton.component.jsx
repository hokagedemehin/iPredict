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
const TriviaHomeButton = ({ index, elem, user, userDoc, setUserDoc }) => {
  // console.log('elem :>> ', elem);
  const router = useRouter();
  // const name = [
  //   'easyway',
  //   'confam',
  //   'originality',
  //   'excellent',
  //   'chairman',
  //   'presido',
  // ];

  // const price = ['50', '200', '1500', '2500', '5000', '10000'];
  // const coins = ['5', '20', '50', '80', '150', '300'];
  // const color = [
  //   '#B25B90',
  //   '#8A2D65',
  //   '#9F1616',
  //   '#670333',
  //   '#FF0000',
  //   '#B90000',
  // ];
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    if (userDoc?.coins < elem?.attributes?.coins) {
      toast.error('💰 Insufficient coins balance');
      // setIsOpen(true);
    } else {
      setIsOpen(true);
    }
  };
  const handleSubmission = async () => {
    // setIsLoading(true);
    // console.log('works');
    if (userDoc?.coins >= elem?.attributes?.coins) {
      await TriviaCoins(
        setIsLoading,
        +elem?.attributes?.coins,
        user,
        userDoc,
        setUserDoc
      );
      // if (!isLoading) {
      //   router.push(
      //     `/triviagame/quiz/${10}/${elem?.attributes?.name}/${
      //       elem?.attributes?.price
      //     }/${elem?.attributes?.coins}`
      //   );
      // }
      if (!isLoading) {
        router.push(`/triviagame/quiz/${elem?.attributes?.name}`);
      }
      onClose();
    }
  };

  return (
    <div>
      <div
        data-aos='fade-up'
        data-aos-duration='1500'
        data-aos-easing='ease-out-back'
        data-aos-delay={100 * index}
        className={`flex flex-col shadow-md shadow-[${elem?.attributes.color}] rounded-xl ring-1 ring-gray-200 p-1 cursor-pointer`}
        onClick={(e) => {
          handleClick(e);
        }}

        // onClick={() => setIsOpen(true)}
      >
        <div
          className={`px-5 py-3 ${
            elem?.attributes?.name == 'originality' ||
            elem?.attributes?.name == 'chairman'
              ? 'text-[12px]'
              : 'text-sm'
          } text-center font-bold bg-[${
            elem?.attributes?.color
          }]  rounded-xl text-white`}
        >
          {elem?.attributes?.name.toUpperCase()}
        </div>
        <div className='flex flex-col mb-3'>
          <Text className='font-bold text-lg text-center -mb-2'>WIN</Text>
          <Text className='font-bold text-xl text-center tracking-wider -mb-2'>
            &#x20A6;{elem?.attributes?.price}
          </Text>
          <div className='flex flex-col my-1'>
            <Text fontSize='xs' className='font-bold  text-center -mb-1'>
              10 Questions
            </Text>
            <Text fontSize='xs' className='font-bold  text-center'>
              Time: 60sec
            </Text>
          </div>
          <div className='flex bg-green-500 rounded-xl space-x-3 mx-1'>
            <div className='flex justify-center items-center space-x-1 bg-[#12036B] text-white px-1 rounded-xl'>
              <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
              <Text fontSize='xs' className='font-semibold'>
                {elem?.attributes?.coins}
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
            {`${elem?.attributes?.coins} coins will be deducted from your wallet, do you want to proceed?`}
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
              variant='solid'
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
