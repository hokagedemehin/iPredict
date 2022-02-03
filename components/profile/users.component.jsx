import React from 'react';
import { useRouter } from 'next/router';

import UsersImageComponent from './users.image.component';
import { Button, Skeleton } from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';
import { motion } from 'framer-motion';

const ProfilePageComponent = ({ userDoc }) => {
  const MotionButton = motion(Button);
  const {
    email,
    firstName,
    lastName,

    phoneNo,
    birthDay,
  } = !userDoc ? {} : userDoc;

  const router = useRouter();
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
    // console.log("router: ", router.pathname);
  };
  return (
    <div className=''>
      <div className=''>
        <div className='max-w-screen-xl mx-auto my-5 p-5'>
          <div className='m-5 text-center'>
            <span className='text-4xl font-black text-gray-400'>Your </span>{' '}
            <span className='text-4xl font-black text-indigo-500 '>
              {' '}
              Profile
            </span>
          </div>
          <div className='md:flex no-wrap md:-mx-2 '>
            {/* <!-- Left Side --> */}
            <div className='w-full md:w-3/12 md:mx-2'>
              {/* <!-- Profile Card --> */}
              <UsersImageComponent userDoc={userDoc} />
              {/* <!-- End of profile card --> */}
              <div className='my-4'></div>
            </div>
            {/* <!-- Right Side --> */}
            <div className='w-full md:w-9/12 md:mx-2 h-full '>
              {/* <!-- Profile tab --> */}
              {/* <!-- About Section --> */}
              <div className='bg-white p-3 border-t-4 border-indigo-400 rounded-lg shadow-md'>
                <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8'>
                  <span className='text-gray-500'>
                    <svg
                      className='h-5'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </span>
                  <span className='tracking-wide'>About</span>
                </div>
                <div className='text-gray-700'>
                  <div className='grid md:grid-cols-2 text-sm sm:text-lg'>
                    <div className='grid grid-cols-2'>
                      <div className=' py-2 font-semibold'>First Name</div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{firstName}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' py-2'>{firstName}</div>
                      )}
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className=' py-2 font-semibold'>Last Name</div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{lastName}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' py-2'>{lastName}</div>
                      )}
                    </div>

                    <div className='grid grid-cols-2'>
                      <div className=' py-2 font-semibold'>Phone No.</div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{phoneNo}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' py-2'>
                          {!phoneNo ? '+11 998001001' : phoneNo}
                        </div>
                      )}
                    </div>

                    <div className='grid grid-cols-2'>
                      <div className=' py-2 font-semibold'>Email.</div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{email}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' py-2'>{email}</div>
                      )}
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className=' py-2 font-semibold'>Birthday</div>
                      {!userDoc ? (
                        <div className='my-2'>
                          <Skeleton>
                            <div className='py-2'>{birthDay}</div>
                          </Skeleton>
                        </div>
                      ) : (
                        <div className=' py-2'>
                          {!birthDay ? '1 Jan' : birthDay}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='pt-5'>
                  <MotionButton
                    onClick={(e) => handleClick(e, '/profile/edit')}
                    variant='outline'
                    rightIcon={<BiEditAlt />}
                    // drag='x'
                    // dragConstraints={{ left: -100, right: 100 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Edit Profile
                  </MotionButton>
                </div>
              </div>
              {/* <!-- End of about section --> */}

              <div className='my-4'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;
