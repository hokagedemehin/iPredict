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
import { HamburgerIcon } from '@chakra-ui/icons';
// import { FaTwitter } from "react-icons/fa";
import { useRouter } from 'next/router';

import {
  GiSoccerBall,
  GiCardPlay,
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

const NavHeader = () => {
  const router = useRouter();
  const { user } = useUser();
  // const [navName, setNavName] = useState('');
  // console.log('navname', navName);
  const handleLogout = async () => {
    // e.preventDefault();
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
    <>
      <Flex px='4' py='2'>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList>
            <MenuItem
              data-name='Home'
              icon={<AiOutlineHome />}
              onClick={(e) => handleClick(e, '/')}
              // className={`${
              //   navName === 'Home' ? 'bg-green-600 text-white' : ' '
              // }`}
            >
              Home
            </MenuItem>
            <MenuItem
              data-name='Predict & Win'
              icon={<GiSoccerBall />}
              onClick={(e) => handleClick(e, '/predictandwin')}
              // className={`${
              //   navName === 'Predict & Win' ? 'bg-green-600 text-white' : ' '
              // }`}
            >
              Predict & Win
            </MenuItem>
            <MenuItem
              data-name='My Predictions'
              icon={<BsFileSpreadsheetFill />}
              onClick={(e) => handleClick(e, '/showprediction')}
            >
              My Predictions
            </MenuItem>
            <MenuItem
              data-name='News & Transfers'
              icon={<GiNewspaper />}
              onClick={(e) => handleClick(e, '/news')}
            >
              News & Transfers
            </MenuItem>
            <MenuItem
              data-name='Team Cards'
              icon={<GiCardPlay />}
              onClick={(e) => handleClick(e, '/teamcard')}
            >
              Team Cards
            </MenuItem>
            <MenuItem
              data-name='Trivia Game'
              icon={<MdOutlineQuiz />}
              onClick={(e) => handleClick(e, '/triviagame')}
            >
              Trivia Game
            </MenuItem>
            <MenuItem
              data-name='Trivia Attempts'
              icon={<BsFileSpreadsheetFill />}
              onClick={(e) => handleClick(e, '/triviaattempts')}
            >
              Trivia Attempts
            </MenuItem>
            <MenuItem
              data-name='Spin Match Virtual'
              icon={<GiCartwheel />}
              onClick={(e) => handleClick(e, '/spinmatch')}
            >
              Spin Match Virtual
            </MenuItem>
            <MenuItem
              data-name='News Magazine'
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
        <Spacer />
        {user ? (
          <Menu>
            <MenuButton
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
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
                borderRadius='md'
                // boxSize='200px'
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                data-name='wallet'
                icon={<GiWallet />}
                onClick={(e) => handleClick(e, '/wallet')}
              >
                wallet
              </MenuItem>
              <MenuItem
                data-name='profile'
                icon={<FaUser />}
                onClick={(e) => handleClick(e, '/profile')}
              >
                Profile
              </MenuItem>
              <MenuItem
                icon={<GoSignOut />}
                onClick={() => {
                  handleLogout();
                }}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            rightIcon={<RiLoginCircleLine />}
            variant='ghost'
            // fontSize='20px'
            // size='sm'
            // colorScheme='blue'
            onClick={(e) => handleClick(e, '/login')}
          >
            Login
          </Button>
        )}
        {/* <Box
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
        </Box> */}
      </Flex>
    </>
  );
};

export default NavHeader;
