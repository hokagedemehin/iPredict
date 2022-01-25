import { Button, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BsCoin } from 'react-icons/bs';

const WalletHomePage = () => {
  return (
    <div>
      <div className='flex flex-col ring-1 ring-gray-200 shadow-lg rounded-xl py-5'>
        <div className='summary w-full'>
          <div className='flex flex-col sm:flex-row space-y-5 sm:space-y-0 '>
            <div className='coins w-full flex justify-center items-center space-x-3'>
              <div className='flex flex-col'>
                <div>
                  <Text>Coins</Text>
                </div>
                <div className='flex items-center gap-1'>
                  <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
                  800
                </div>
              </div>
              <div>
                <Button>Buy Coins</Button>
              </div>
            </div>
            <div className='cash w-full flex items-center justify-center space-x-3'>
              <div className='flex flex-col'>
                <div>
                  <Text>Cash</Text>
                </div>
                <div className='flex items-center gap-1'>
                  <Icon as={BsCoin} className='bg-green-500 rounded-full' />N
                  300,000
                </div>
              </div>
              <div>
                <Button>Withdraw</Button>
              </div>
            </div>
          </div>
        </div>
        <div className='buy w-full'></div>
      </div>
    </div>
  );
};

export default WalletHomePage;
