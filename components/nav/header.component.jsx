import React from 'react';
import {
  Flex,
  // Box,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
// import { FaTwitter } from "react-icons/fa";
import { useRouter } from 'next/router';

import {
  GiSoccerBall,
  GiCardPlay,
  GiCardRandom,
  GiWallet,
  GiNewspaper,
  GiCartwheel,
} from 'react-icons/gi';
import { BsNewspaper, BsFileSpreadsheetFill } from 'react-icons/bs';
import { MdOutlineQuiz } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase';
import { useUser } from '../../utils/auth/userContext';
import { RiLoginCircleLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import SetUserHistory from '../../utils/wallet/setUserHistory';

const NavHeader = () => {
  const router = useRouter();
  const { user, userDoc } = useUser();
  // const [navName, setNavName] = useState('');
  // console.log('navname', navName);
  const handleLogout = async () => {
    // e.preventDefault();
    const newData = {
      coins: 0,
      money: 0,
      activity: '',
      type: 'User Logout',
    };

    await SetUserHistory(userDoc, newData);
    await signOut(auth);
    router.push('/');
  };
  const handleClick = (e, href) => {
    e.preventDefault();
    // console.log('e :>> ', e);
    // setNavName(e.target.dataset.name);
    router.push(href);
  };
  return (
    <div
      data-aos='fade-right'
      data-aos-duration='1500'
      data-aos-easing='ease-out-back'
      className='relative'
    >
      <Flex px='4' py='2' className=' '>
        {/* mobile */}
        <div className='sm:hidden z-10'>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem
                data-cy-name='Home'
                icon={<AiOutlineHome />}
                onClick={(e) => handleClick(e, '/')}
                // className={`${
                //   navName === 'Home' ? 'bg-green-600 text-white' : ' '
                // }`}
              >
                Home
              </MenuItem>
              <MenuItem
                data-cy-name='Predict & Win'
                icon={<GiSoccerBall />}
                onClick={(e) => handleClick(e, '/predictandwin')}
                // className={`${
                //   navName === 'Predict & Win' ? 'bg-green-600 text-white' : ' '
                // }`}
              >
                Predict & Win
              </MenuItem>
              <MenuItem
                data-cy-name='My Predictions'
                icon={<BsFileSpreadsheetFill />}
                onClick={(e) => handleClick(e, '/showprediction')}
              >
                My Predictions
              </MenuItem>
              <MenuItem
                data-cy-name='News & Transfers'
                icon={<GiNewspaper />}
                onClick={(e) => handleClick(e, '/news')}
              >
                News & Transfers
              </MenuItem>
              <MenuItem
                data-cy-name='Team Cards'
                icon={<GiCardPlay />}
                onClick={(e) => handleClick(e, '/teamcard/buy')}
              >
                Buy Cards
              </MenuItem>
              <MenuItem
                data-cy-name='Team Cards'
                icon={<GiCardRandom />}
                onClick={(e) => handleClick(e, '/teamcard')}
              >
                Team Cards
              </MenuItem>
              <MenuItem
                data-cy-name='Trivia Game'
                icon={<MdOutlineQuiz />}
                onClick={(e) => handleClick(e, '/triviagame')}
              >
                Trivia Game
              </MenuItem>
              <MenuItem
                data-cy-name='Trivia Attempts'
                icon={<BsFileSpreadsheetFill />}
                onClick={(e) => handleClick(e, '/triviaattempts')}
              >
                Trivia Attempts
              </MenuItem>
              <MenuItem
                data-cy-name='Spin Match Virtual'
                icon={<GiCartwheel />}
                onClick={(e) => handleClick(e, '/spinmatch')}
              >
                Spin Match Virtual
              </MenuItem>
              <MenuItem
                data-cy-name='News Magazine'
                icon={<BsNewspaper />}
                onClick={(e) => handleClick(e, '/magazine')}
              >
                News Magazine
              </MenuItem>

              {/* {user ? (
              <MenuItem
                icon={<GoSignOut />}
                // onClick={() => router.push("/magazine")}
                onClick={() => {
                  handleLogout();
                }}
              >
                Sign Out
              </MenuItem>
            ) : (
              <MenuItem
                icon={<GoSignIn />}
                // onClick={() => router.push("/magazine")}
                onClick={(e) => handleClick(e, '/login')}
              >
                Sign In
              </MenuItem>
            )} */}
            </MenuList>
          </Menu>
        </div>
        {/* desktop */}
        <div className='hidden sm:flex w-full max-w-2xl z-10'>
          <nav className='flex justify-around w-full items-center'>
            <Button
              data-cy-name='Home - large'
              variant='ghost'
              onClick={(e) => handleClick(e, '/')}
            >
              Home
            </Button>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    variant='ghost'
                    rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  >
                    Predict
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      data-cy-name='Predict & Win - large'
                      icon={<GiSoccerBall />}
                      onClick={(e) => handleClick(e, '/predictandwin')}
                      // className={`${
                      //   navName === 'Predict & Win' ? 'bg-green-600 text-white' : ' '
                      // }`}
                    >
                      Predict & Win
                    </MenuItem>
                    <MenuItem
                      data-cy-name='My Predictions - large'
                      icon={<BsFileSpreadsheetFill />}
                      onClick={(e) => handleClick(e, '/showprediction')}
                    >
                      My Predictions
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    variant='ghost'
                    rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  >
                    News
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      data-cy-name='News & Transfers - large'
                      icon={<GiNewspaper />}
                      onClick={(e) => handleClick(e, '/news')}
                    >
                      News & Transfers
                    </MenuItem>
                    <MenuItem
                      data-cy-name='News Magazine'
                      icon={<BsNewspaper />}
                      onClick={(e) => handleClick(e, '/magazine')}
                    >
                      News Magazine
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    variant='ghost'
                    rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  >
                    Trivia
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      data-cy-name='Trivia Game - large'
                      icon={<MdOutlineQuiz />}
                      onClick={(e) => handleClick(e, '/triviagame')}
                    >
                      Trivia Game
                    </MenuItem>
                    <MenuItem
                      data-cy-name='Trivia Attempts - large'
                      icon={<BsFileSpreadsheetFill />}
                      onClick={(e) => handleClick(e, '/triviaattempts')}
                    >
                      Trivia Attempts
                    </MenuItem>
                    <MenuItem
                      data-cy-name='Spin Match Virtual - large'
                      icon={<GiCartwheel />}
                      onClick={(e) => handleClick(e, '/spinmatch')}
                    >
                      Spin Match Virtual
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    variant='ghost'
                    rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  >
                    Cards
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      data-cy-name='Team Cards - large'
                      icon={<GiCardPlay />}
                      onClick={(e) => handleClick(e, '/teamcard/buy')}
                    >
                      Buy Cards
                    </MenuItem>

                    <MenuItem
                      data-cy-name='Team Cards - large'
                      icon={<GiCardRandom />}
                      onClick={(e) => handleClick(e, '/teamcard')}
                    >
                      My Team Cards
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </nav>
        </div>
        <Spacer />
        {user ? (
          <div className='flex justify-between items-center space-x-2 sm:space-x-5'>
            {/* wallet */}
            <div className='flex'>
              <IconButton
                colorScheme='facebook'
                variant='outline'
                isRound={true}
                aria-label='wallet page'
                icon={<GiWallet />}
                onClick={(e) => handleClick(e, '/wallet')}
                fontSize='lg'
                data-cy-name='wallet'
              />
            </div>
            {/* profile */}
            <Menu>
              <MenuButton
                cursor='pointer'
                data-cy-name='profileBtn'
                _hover={{
                  background: 'gray.200',
                }}
                // p='2'
                rounded='full'
                as='button'
              >
                <Image
                  className='h-8 w-8 rounded-full'
                  data-cy-name='profile image'
                  src='https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100'
                  alt="user's profile"
                  fallbackSrc='https://via.placeholder.com/30?text=user'
                  borderRadius='md'
                  // boxSize='200px'
                />
              </MenuButton>
              <MenuList>
                {/* <MenuItem
                  data-cy-name='wallet'
                  icon={<GiWallet />}
                  onClick={(e) => handleClick(e, '/wallet')}
                >
                  wallet
                </MenuItem> */}
                <MenuItem
                  data-cy-name='profilePage'
                  icon={<FaUser />}
                  onClick={(e) => handleClick(e, '/profile')}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  data-cy-name='logOut'
                  icon={<GoSignOut />}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <Button
            rightIcon={<RiLoginCircleLine />}
            variant='ghost'
            data-cy-name='loginBtn'
            // fontSize='20px'
            // size='sm'
            // colorScheme='blue'
            onClick={(e) => handleClick(e, '/login')}
          >
            Login
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default NavHeader;

/**
 * 
 * <Box
          cursor='pointer'
          _hover={{
            background: 'gray.200',
          }}
          p='2'
          rounded='full'
          as='button'
        >
          <Image
            className='h-8 w-8 rounded-full'
            src='https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100'
            // src="https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100"
            alt="user's profile"
            fallbackSrc='https://via.placeholder.com/30?text=user'
            borderRadius='md'
            // boxSize='200px'
          />
        </Box>
 */
