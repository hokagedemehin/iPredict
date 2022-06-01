import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BsCoin } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import { useQuery } from 'react-query';
import GetUserInfo from '../../utils/auth/getUserInfo';

// import CoinsComponent from './coins.component';
import CoinsComponentPayStack from './coins.paystack.component';
import HistoryComponent from './history.component';
import { AiOutlineBank, AiOutlineUser } from 'react-icons/ai';
import { MdAccountBalanceWallet, MdPhoneIphone } from 'react-icons/md';
import withdrawalrequest from '../../utils/wallet/withdrawalrequest';

const WalletHomePage = ({ userDoc, user, setUserDoc }) => {
  const toast = useToast();
  // const [userData, setUserData] = useState([]);
  // console.log('userData', userData);
  const walletData = [
    { id: 1, coins: 10, amount: 50, discount: '0', badge: 'discount1.png' },
    { id: 2, coins: 25, amount: 100, discount: '125', badge: 'discount1.png' },
    { id: 3, coins: 60, amount: 200, discount: '300', badge: 'discount1.png' },
    { id: 4, coins: 150, amount: 500, discount: '750', badge: 'discount1.png' },
    {
      id: 5,
      coins: 350,
      amount: 1000,
      discount: '1750',
      badge: 'discount1.png',
    },
    {
      id: 6,
      coins: 1800,
      amount: 5000,
      discount: '9000',
      badge: 'special1.png',
    },
  ];

  const [userInfo, setUserInfo] = useState([]);

  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    ['userInfo', userDoc],
    async () => await GetUserInfo(userDoc),
    { enabled: !!userDoc }
  );
  useEffect(() => {
    if (isSuccess) {
      setUserInfo(data);
    }
  }, [isSuccess, dataUpdatedAt]);

  // ********************************************************
  // withdraw Logic
  // **********************************************************
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [formValue, setFormValue] = useState({
    fullname: '',
    accountnumber: '',
    bankname: '',
    phonenumber: '',
  });
  console.log('formValue :>> ', formValue.fullname.length);
  console.log('formValue :>> ', formValue);
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  const handleOpen = () => {
    onOpen();
    setFormValue({
      fullname: '',
      accountnumber: '',
      bankname: '',
      phonenumber: '',
    });
  };

  const handleWithdraw = async () => {
    if (
      formValue?.fullname.trim().length !== 0 &&
      formValue?.accountnumber.trim().length !== 0 &&
      formValue?.bankname.trim().length !== 0 &&
      formValue?.phonenumber.trim().length !== 0
    ) {
      await withdrawalrequest(
        setWithdrawLoading,
        formValue,
        userDoc,
        setUserDoc,
        setFormValue
      );
      onClose();
    } else {
      toast({
        title: 'Missing Details',
        description: 'Please fill all fields',
        status: 'error',
        variant: 'solid',
        position: 'top',
        // duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className=''>
      <div className='flex flex-col space-y-10 mb-5'>
        <div className='summary w-full bg-purple-700 ring-1 ring-gray-200 shadow-lg rounded-xl py-5 '>
          <div className='flex flex-col sm:flex-row space-y-5 sm:space-y-0 '>
            <div className='coins w-full flex justify-center items-center space-x-3'>
              <div className='flex flex-col text-white justify-center items-center text-lg sm:text-2xl'>
                <div>
                  <Text className=''>Coins</Text>
                </div>
                <div className='flex items-center gap-1 font-bold'>
                  <Icon as={BsCoin} className='bg-yellow-500 rounded-full' />
                  {isLoading ? (
                    <Skeleton>coins</Skeleton>
                  ) : isSuccess && userInfo.length !== 0 ? (
                    userInfo?.coins
                  ) : (
                    0
                  )}
                </div>
              </div>
              {/* <div>
                <Button>Buy Coins</Button>
              </div> */}
            </div>
            <div className='cash w-full flex items-center justify-center space-x-3'>
              <div className='flex flex-col justify-center items-center text-white text-lg sm:text-2xl'>
                <div>
                  <Text>Cash</Text>
                </div>
                <div className='flex items-center gap-1 font-bold'>
                  <Icon as={GiMoneyStack} className='' />
                  &#x20A6;
                  {isLoading ? (
                    <Skeleton>money</Skeleton>
                  ) : isSuccess && userInfo.length !== 0 ? (
                    userInfo?.money
                  ) : (
                    0
                  )}
                </div>
              </div>
              {userInfo?.money >= 1000 && (
                <div>
                  <Button
                    // isDisabled={userInfo?.money < 1000}
                    className='transform transition duration-200 ease-in hover:scale-105'
                    onClick={handleOpen}
                    colorScheme='blue'
                    // variant='solid'
                  >
                    Withdraw
                  </Button>
                </div>
              )}
            </div>
            {userInfo?.request > 0 && (
              <div className='request w-full flex items-center justify-center space-x-3'>
                <div className='flex flex-col justify-center items-center text-white text-lg sm:text-2xl'>
                  <div>
                    <Text>Request</Text>
                  </div>
                  <div className='flex items-center gap-1 font-bold'>
                    <Icon as={GiMoneyStack} className='' />
                    &#x20A6;
                    {isLoading ? (
                      <Skeleton>money</Skeleton>
                    ) : isSuccess && userInfo.length !== 0 ? (
                      userInfo?.request
                    ) : (
                      0
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='buy w-full bg-purple-700 ring-1 ring-gray-200 shadow-lg rounded-xl py-5 px-2 '>
          <Tabs isFitted variant='unstyled' colorScheme='teal'>
            <TabList mb='1rem'>
              <Tab
                _selected={{ color: 'white', bg: 'purple.700' }}
                className='text-white rounded-full font-bold'
              >
                Buy Coins
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'purple.700' }}
                className='text-white rounded-full font-bold'
              >
                History
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className='flex flex-wrap gap-4 justify-center items-center'>
                  {walletData.map((data, index) => (
                    <CoinsComponentPayStack
                      key={index}
                      data={data}
                      userDoc={userDoc}
                      user={user}
                      setUserDoc={setUserDoc}
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <HistoryComponent user={userDoc} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Withdraw Request
            </AlertDialogHeader>

            <AlertDialogBody>
              <div className='flex flex-col'>
                {/* full name */}
                <div className='flex'>
                  <FormControl isRequired>
                    <FormLabel htmlFor='fullname'>Full Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineUser />}
                      />
                      <Input
                        name='fullname'
                        id='fullname'
                        type='text'
                        placeholder='Full name'
                        // value={formValue?.firstName}
                        onChange={(e) => handleChange(e)}
                      />
                    </InputGroup>
                  </FormControl>
                </div>

                {/* account number */}
                <div className='flex'>
                  <FormControl isRequired>
                    <FormLabel htmlFor='accountnumber'>
                      Account Number
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<MdAccountBalanceWallet />}
                      />
                      <Input
                        name='accountnumber'
                        id='accountnumber'
                        type='text'
                        placeholder='Account Number'
                        // value={formValue?.firstName}
                        onChange={(e) => handleChange(e)}
                      />
                    </InputGroup>
                  </FormControl>
                </div>

                {/* bank name */}
                <div className='flex'>
                  <FormControl isRequired>
                    <FormLabel htmlFor='bankname'>Bank Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineBank />}
                      />
                      <Input
                        name='bankname'
                        id='bankname'
                        type='text'
                        placeholder='Bank Name'
                        // value={formValue?.firstName}
                        onChange={(e) => handleChange(e)}
                      />
                    </InputGroup>
                  </FormControl>
                </div>

                {/* phone number */}
                <div className='flex'>
                  <FormControl isRequired>
                    <FormLabel htmlFor='phonenumber'>Phone Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<MdPhoneIphone />}
                      />
                      <Input
                        name='phonenumber'
                        id='phonenumber'
                        type='text'
                        placeholder='Phone number'
                        // value={formValue?.firstName}
                        onChange={(e) => handleChange(e)}
                      />
                    </InputGroup>
                  </FormControl>
                </div>
              </div>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={withdrawLoading}
                colorScheme='teal'
                variant='outline'
                onClick={async () => await handleWithdraw()}
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default WalletHomePage;

/******<div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                25 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N100
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                60 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N200
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                150 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N500
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                350 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N1000
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                1800 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N5000
              </div>
            </div> */
