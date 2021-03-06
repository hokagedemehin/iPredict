import React from 'react';
import {
  GiSoccerBall,
  GiCardPlay,
  GiCartwheel,
  GiNewspaper,
} from 'react-icons/gi';
import { BsNewspaper } from 'react-icons/bs';
import { MdOutlineQuiz } from 'react-icons/md';
import { Heading, Icon, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ContentComponent = ({ userDoc }) => {
  const router = useRouter();
  const toast = useToast();
  const handleCopy = () => {
    toast({
      title: 'Copied',
      // description: "We've created your account for you.",
      status: 'success',
      // duration: 5000,
      isClosable: true,
    });
  };

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  return (
    <div className='pt-16'>
      <div className='grid sm:grid-cols-3 grid-cols-2 gap-4 mx-4'>
        <div
          data-aos='zoom-in'
          data-aos-easing='ease-out-back'
          data-aos-duration='1500'
          data-cy-name='home-btns'
          onClick={() => router.push('/predictandwin')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700 '
        >
          <Icon as={GiSoccerBall} w={10} h={10} />

          <p className='text-sm font-bold text-center'>Predict & Win</p>
        </div>

        <div
          data-cy-name='home-btns'
          data-aos='zoom-in'
          data-aos-easing='ease-out-back'
          data-aos-duration='1500'
          data-aos-delay='50'
          onClick={() => router.push('/news')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={BsNewspaper} w={10} h={10} />
          <p className='text-sm font-bold text-center'>News & Transfer</p>
        </div>

        <div
          data-cy-name='home-btns'
          data-aos='zoom-in'
          data-aos-easing='ease-out-back'
          data-aos-duration='1500'
          data-aos-delay='100'
          onClick={() => router.push('/teamcard')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={GiCardPlay} w={10} h={10} />
          <p className='text-sm font-bold text-center'>Team Cards</p>
        </div>
        <div
          data-cy-name='home-btns'
          data-aos='zoom-in'
          data-aos-easing='ease-out-back'
          data-aos-duration='1500'
          data-aos-delay='150'
          onClick={() => router.push('/triviagame')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={MdOutlineQuiz} w={10} h={10} />
          <p className='text-sm font-bold text-center'>Trivia Game</p>
        </div>

        <div
          data-cy-name='home-btns'
          data-aos='zoom-in'
          data-aos-easing='ease-out-back'
          data-aos-duration='1500'
          data-aos-delay='200'
          onClick={() => router.push('/spinmatch')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={GiCartwheel} w={10} h={10} />
          <p className='text-sm font-bold text-center'>Spin Match Virtual</p>
        </div>
        <div
          data-cy-name='home-btns'
          data-aos='zoom-in'
          data-aos-easing='ease-out-back'
          data-aos-duration='1500'
          data-aos-delay='250'
          onClick={() => router.push('/magazine')}
          className='flex flex-col items-center justify-center shadow-md space-y-2 rounded-md cursor-pointer hover:bg-gray-100 transform transition duration-200 ease-in py-4 px-2 sm:py-6 sm:px-4 bg-white hover:scale-105 shadow-gray-700'
        >
          <Icon as={GiNewspaper} w={10} h={10} />
          <p className='text-sm font-bold text-center'>News Magazine</p>
        </div>
      </div>
      <div
        data-aos='flip-left'
        data-aos-easing='ease-out-back'
        data-aos-duration='1500'
        className='pt-16 text-center mx-4  pb-5'
      >
        {userDoc && userDoc?.referralCode ? (
          <div className='bg-blue-400 w-fit mx-auto p-3 rounded-lg shadow-md shadow-black space-y-1'>
            <Heading fontSize={['xs', 'md', '2xl']}>
              Share your referral code and earn 1 coin NOW!
            </Heading>

            <CopyToClipboard
              text={`${baseUrl}/register/${userDoc?.referralCode}`}
              onCopy={() => handleCopy()}
            >
              <div className=' bg-white text-black shadow-black rounded-lg w-fit mx-auto px-2 py-2 flex space-x-3 items-center justify-center'>
                <Text fontSize={['xs', 'sm', 'xl']} className='font-semibold'>
                  {/* {baseUrl / userDoc?.referralCode} */}
                  {`${baseUrl}/register/${userDoc?.referralCode}`}
                </Text>
              </div>
            </CopyToClipboard>
          </div>
        ) : (
          ''
        )}
      </div>
      {/* <div className='pt-10 mx-4 pb-5 flex justify-center'>
        <div
          onClick={() => router.push('/tutorials')}
          className='flex justify-center items-center text-center transition ease-in-out duration-500 px-6 py-4 border border-gray-400 rounded-md cursor-pointer w-fit text-white font-bold text-xl hover:border-white hover:bg-black'
        >
          Short tutorials on how to play and win
        </div>
      </div> */}
    </div>
  );
};

export default ContentComponent;
