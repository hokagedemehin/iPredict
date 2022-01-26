import { Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import UpdateUserWallet from '../../utils/wallet/updateUserWallet';
// import { useRouter } from 'next/router';

const CoinsComponent = ({ data, userDoc, user }) => {
  // const router = useRouter();
  // console.log(process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY);
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: data.amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userDoc?.email,
      phonenumber: '07030000000',
      name: `${userDoc?.firstName} ${userDoc?.lastName}`,
    },
    customizations: {
      title: 'I-Predict Store',
      description: 'Payment for items in cart',
      logo: 'https://firebasestorage.googleapis.com/v0/b/i-predict-test.appspot.com/o/logo%2Fipredict.png?alt=media&token=72da23fc-edbd-4232-84b0-f4936fd67485',
    },
    // redirect_url: '/wallet',
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleClick = (e) => {
    e.preventDefault();
    handleFlutterPayment({
      callback: async (response) => {
        if (response.status === 'successful') {
          await UpdateUserWallet(data.coins, user);
          closePaymentModal;
        }
      },
      onClose: () => {
        // router.push('/wallet');
      },
    });
  };

  return (
    <div>
      <div
        onClick={(e) => {
          handleClick(e);
        }}
        className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'
      >
        <Image
          className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
          src='/logo/coins.png'
          alt="user's profile"
          fallbackSrc='https://via.placeholder.com/30?text=user'
        />
        <Text className='text-white sm:text-xl font-semibold'>
          {data.coins} Coins
        </Text>
        <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
          N{data.amount}
        </div>
      </div>
    </div>
  );
};

export default CoinsComponent;
