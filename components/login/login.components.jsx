/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithRedirect,
} from 'firebase/auth';
// import { auth } from "../../services/firebase/firebase";
import { useRouter } from 'next/router';
// import { useUser } from "../../services/context/userContext";
// import { SingInGoogleTailor } from "../../services/actions/signInGoogleTailor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useUser } from "../../utils/auth/userContext";
import { auth } from '../../utils/firebase/firebase';
import { SignInGoogleUser } from '../../utils/auth/signInGoogleUser';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import SetUserHistory from '../../utils/wallet/setUserHistory';
const qs = require('qs');
import axios from 'axios';

const LoginComponent = ({ setUserDoc }) => {
  const [formValue, setFormValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  // const { user } = useUser();
  const router = useRouter();

  const referralCode = nanoid(15);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };
  // console.log(formValue);

  const loginUser = async (e) => {
    // console.log("button clicked", formValue);
    e.preventDefault();
    try {
      setIsLoading(true);
      const email = formValue.email;
      const password = formValue.password;

      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        const query = qs.stringify({
          filters: {
            email: {
              $eq: user?.email,
            },
          },
        });

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles?${query}`
        );

        const existingUser = data?.data[0]?.attributes;

        setUserDoc(existingUser);
        const newData = {
          coins: 0,
          money: 0,
          activity: '',
          type: 'User Login',
        };

        await SetUserHistory(existingUser, newData);
      }
    } catch (error) {
      toast.error('💥Incorrect Email or Password! 😪😥💥');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignin = async (e) => {
    e.preventDefault();
    await SignInGoogleUser(referralCode);
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
    // console.log("final Data:", formValue);
  };

  const handleShow = () => setShow(!show);

  return (
    <div>
      <div>
        <div className='bg-white py-6 sm:py-8 lg:py-12'>
          <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
            <h2 className='text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8'>
              Login
            </h2>

            <form className='max-w-lg border rounded-lg mx-auto'>
              <div className='flex flex-col gap-4 p-4 md:p-8'>
                <div>
                  <label
                    htmlFor='email'
                    className='inline-block text-gray-800 text-sm sm:text-base mb-2'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    onChange={(e) => handleChange(e)}
                    className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                    placeholder='Enter email'
                  />
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='inline-block text-gray-800 text-sm sm:text-base mb-2'
                  >
                    Password
                  </label>
                  {/* <input
                    type='password'
                    name='password'
                    onChange={(e) => handleChange(e)}
                    className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                  /> */}
                  <InputGroup>
                    <Input
                      type={show ? 'text' : 'password'}
                      placeholder='Enter password'
                      name='password'
                      onChange={(e) => handleChange(e)}
                      // className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                    />
                    <InputRightElement>
                      <Button size='sm' variant='ghost' onClick={handleShow}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </div>

                {/* <button
                  onClick={(e) => loginUser(e)}
                  className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                >
                  Log in
                </button> */}
                <div className='flex my-5'>
                  <Button
                    // leftIcon={<BiMailSend />}
                    colorScheme='blue'
                    variant='solid'
                    isFullWidth
                    fontSize='xl'
                    // onClick={handleSubmission}
                    isLoading={isLoading}
                    loadingText='Sending'
                    spinnerPlacement='end'
                    onClick={(e) => loginUser(e)}
                  >
                    Log in
                  </Button>
                </div>

                {/* <div className="flex justify-center items-center relative">
                  <span className="h-px bg-gray-300 absolute inset-x-0"></span>
                  <span className="bg-white text-gray-400 text-sm relative px-4">
                    Log in with social
                  </span>
                </div> */}

                {/* <button className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z"
                      fill="white"
                    />
                  </svg>
                  Continue with Facebook
                </button> */}

                <button
                  onClick={(e) => googleSignin(e)}
                  className='flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-300 focus-visible:ring ring-gray-300 text-gray-800 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3'
                >
                  <svg
                    className='w-5 h-5 flex-shrink-0'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z'
                      fill='#4285F4'
                    />
                    <path
                      d='M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z'
                      fill='#34A853'
                    />
                    <path
                      d='M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z'
                      fill='#FBBC05'
                    />
                    <path
                      d='M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z'
                      fill='#EA4335'
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className='flex flex-col space-y-2 justify-center items-center bg-gray-100 p-4'>
                <p className='text-gray-500 text-sm text-center'>
                  Don't have an account?{' '}
                  <a
                    href='!#'
                    onClick={(e) => handleClick(e, '/register')}
                    className='text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100'
                  >
                    Register
                  </a>
                </p>
                <p className='text-gray-500 text-sm text-center'>
                  Forgot Password?{' '}
                  <a
                    href='!#'
                    onClick={(e) => handleClick(e, '/reset')}
                    className='text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100'
                  >
                    Reset
                  </a>
                </p>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
