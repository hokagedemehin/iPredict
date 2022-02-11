import { Button, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SendRewardToWallet from '../../../utils/wallet/sendRewardToWallet';

const TenResponse = ({ figures, user, userDoc }) => {
  // const [greeting, setgreeting] = useState('');
  // const [caption, setcaption] = useState('');
  // const [money, setmoney] = useState('');
  // const [btnName, setbtnName] = useState('');

  const router = useRouter();
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };
  // const toast = useToast();
  const reward = +figures.price;
  const uid = user?.uid;
  // const handlePayWallet = async () => {

  //   await SendRewardToWallet(reward, uid);
  // };

  // * all responses are correct

  useEffect(() => {
    if (figures.correctAnswers == 10) {
      // useMemo(() => SendRewardToWallet(reward, uid), [reward, uid]);
      // console.log('reward given');
      SendRewardToWallet(reward, uid, userDoc);
      // toast({
      //   title: 'Reward Sent.',
      //   description: 'Check your wallet to see cash reward',
      //   status: 'success',
      //   // duration: 9000,
      //   isClosable: true,
      // });
    }
  }, []);

  // * correct responses are greater than 6 but less than 10
  // if (
  //   figures.noOfQuestions == 10 &&
  //   figures.correctAnswers < 10 &&
  //   figures.correctAnswers > 6
  // ) {
  //   // console.log('response > 6: ', figures.correctAnswers);
  //   setgreeting('So Close 🤏🏾🤏🏾');
  //   setcaption('Give it Another shot !!!');
  //   setmoney(null);
  //   setbtnName('Choose Category');
  // }
  // * correct responses are greater than 3 but less than 7
  // if (
  //   figures.noOfQuestions == 10 &&
  //   figures.correctAnswers < 7 &&
  //   figures.correctAnswers > 3
  // ) {
  //   // console.log('response > 3: ', figures.correctAnswers);
  //   setgreeting('Great Attempt 👏🏾👏🏾');
  //   setcaption('Try Again !!!');
  //   setmoney('');
  //   setbtnName('Choose Category');
  // }
  // * correct responses are less than 4
  // if (figures.correctAnswers < 4) {
  // console.log('response < 3: ', figures.correctAnswers);
  // setgreeting('Nice Try 💪🏾💪🏾');
  // setcaption('Go Again !!!');
  // setmoney('');
  // setbtnName('Choose Category');
  // }

  return (
    <div>
      {figures.noOfQuestions == 10 && figures.correctAnswers == 10 && (
        <div className='flex flex-col justify-center'>
          <Heading className=' mt-4 text-center text-green-700'>
            Congratulations 🎉🎉
          </Heading>
          <Text className='text-center text-xl font-bold mt-4'>
            You Won !!!
          </Text>
          <Heading className='text-center'>&#x20A6;{figures.price}</Heading>
          <Button
            fontSize='lg'
            variant='outline'
            colorScheme='teal'
            onClick={(e) => {
              handleClick(e, `/triviagame`);
            }}
          >
            Win Again
          </Button>
        </div>
      )}
      {figures.noOfQuestions == 10 &&
        figures.correctAnswers < 10 &&
        figures.correctAnswers > 6 && (
          <div className='flex flex-col justify-center'>
            <Heading className=' mt-4 text-center text-green-700'>
              So Close 🤏🏾🤏🏾
            </Heading>
            <Text className='text-center text-xl font-bold mt-4 mb-2'>
              Give it Another shot !!!
            </Text>
            <Button
              fontSize='lg'
              variant='outline'
              colorScheme='teal'
              onClick={(e) => {
                handleClick(e, `/triviagame`);
              }}
            >
              Choose Category
            </Button>
          </div>
        )}
      {figures.noOfQuestions == 10 &&
        figures.correctAnswers < 7 &&
        figures.correctAnswers > 3 && (
          <div className='flex flex-col justify-center'>
            <Heading className=' mt-4 text-center text-green-700'>
              Great Attempt 👏🏾👏🏾
            </Heading>
            <Text className='text-center text-xl font-bold mt-4 mb-2'>
              Try Again !!!
            </Text>
            <Button
              fontSize='lg'
              variant='outline'
              colorScheme='teal'
              onClick={(e) => {
                handleClick(e, `/triviagame`);
              }}
            >
              Choose Category
            </Button>
          </div>
        )}
      {figures.noOfQuestions == 10 && figures.correctAnswers < 4 && (
        <div className='flex flex-col justify-center'>
          <Heading className=' mt-4 text-center text-green-700'>
            Nice Try 💪🏾💪🏾
          </Heading>
          <Text className='text-center text-xl font-bold mt-4 mb-2'>
            Go Again !!!
          </Text>

          <Button
            fontSize='lg'
            variant='outline'
            colorScheme='green'
            onClick={(e) => {
              handleClick(e, `/triviagame`);
            }}
          >
            Choose Category
          </Button>
        </div>
      )}
    </div>
  );
};

export default TenResponse;

/**
 *  
 * 
 * 
 * 
 * <div>
      <div className='flex flex-col justify-center'>
        <Heading className=' mt-4 text-center text-green-700'>
          {greeting}
        </Heading>
        <Text className='text-center text-xl font-bold mt-4'>{caption}</Text>
        {figures.correctAnswers == 10 && (
          <Heading className='text-center'>N {money}</Heading>
        )}
        <Button
          fontSize='lg'
          variant='outline'
          colorScheme='teal'
          onClick={(e) => {
            handleClick(e, `/triviagame`);
          }}
        >
          {btnName}
        </Button>
      </div>
    </div>
 */
