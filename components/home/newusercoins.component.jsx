import { Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {} from '@chakra-ui/react';
import ClaimFreeCoins from '../../utils/user/claimFreeCoins';

const NewUserFreeCoins = ({ user, userDoc }) => {
  // const { isOpen, onClose } = useDisclosure();
  const [isLoad, setIsLoad] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    await ClaimFreeCoins(user, setIsLoad, userDoc);
  };

  return (
    <div className=' ring-1 py-2 rounded-lg shadow-md shadow-black bg-blue-400 max-w-xs mx-auto'>
      <div className='flex text-center justify-center items-center space-x-3 '>
        <Text className='font-semibold'>Claim your free 15 coins Now!</Text>
        <Button
          variant='solid'
          colorScheme='teal'
          size='sm'
          isLoading={isLoad}
          onClick={(e) => handleClick(e)}
        >
          Claim
        </Button>
      </div>
    </div>
  );
};

export default NewUserFreeCoins;
