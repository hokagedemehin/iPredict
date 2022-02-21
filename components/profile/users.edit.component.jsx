import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdOutlineArrowBack, MdSend } from 'react-icons/md';
import EditUserProfile from '../../utils/profile/edituserprofile';
import UsersImageComponent from './users.image.component';
import { motion } from 'framer-motion';

const UsersProfileEditComponent = ({ userDoc, user }) => {
  const MotionButton = motion(Button);
  const [formValue, setFormValue] = useState(userDoc);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(imgValue?.photo);
    if (
      !formValue?.firstName ||
      !formValue?.lastName ||
      !formValue?.phoneNo ||
      !formValue?.birthDay
    ) {
      // console.log("stop send");
      toast({
        title: 'Attention!',
        description: 'Please fill all required fields',
        status: 'error',
        // duration: 9000,
        isClosable: true,
      });
    }
    if (
      formValue?.firstName &&
      formValue?.lastName &&
      formValue?.phoneNo &&
      formValue?.birthDay
    ) {
      await EditUserProfile(formValue, user, setIsLoading);
      router.push('/profile');
    }
  };
  return (
    <div className=''>
      <div className='my-5 p-5'>
        <div className='m-5 text-center'>
          <span className='text-4xl font-black text-gray-400'>Edit </span>{' '}
          <span className='text-4xl font-black text-indigo-500 '> Profile</span>
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
          <div className='w-full md:w-9/12 md:mx-2 h-full'>
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
                <div className='grid md:grid-cols-2 gap-4 text-sm'>
                  <div className=''>
                    <label
                      htmlFor='firstName'
                      className='inline-block text-gray-800 text-sm sm:text-base mb-2'
                    >
                      First Name*
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      // required="required"
                      value={!formValue ? '' : formValue?.firstName}
                      onChange={(e) => handleChange(e)}
                      className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                    />
                  </div>
                  <div className=''>
                    <label
                      htmlFor='lastName'
                      className='inline-block text-gray-800 text-sm sm:text-base mb-2'
                    >
                      Last Name*
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      // required="required"
                      value={!formValue ? '' : formValue?.lastName}
                      onChange={(e) => handleChange(e)}
                      className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='phoneNo'
                      className='inline-block text-gray-800 text-sm sm:text-base mb-2'
                    >
                      Phone Number*
                    </label>
                    <input
                      type='tel'
                      name='phoneNo'
                      onChange={(e) => handleChange(e)}
                      value={!formValue ? '' : formValue?.phoneNo}
                      className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                    />
                  </div>

                  <div className=''>
                    <label
                      htmlFor='birthDay'
                      className='inline-block text-gray-800 text-sm sm:text-base mb-2'
                    >
                      Birthday*
                    </label>
                    <input
                      name='birthDay'
                      type='text'
                      onChange={(e) => handleChange(e)}
                      value={!formValue ? '' : formValue.birthDay}
                      className='w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2'
                    />
                  </div>
                </div>
              </div>

              <div className='flex space-x-4 my-4 max-w-md mx-auto'>
                <MotionButton
                  isFullWidth
                  variant='outline'
                  colorScheme='red'
                  leftIcon={<MdOutlineArrowBack />}
                  fontSize='lg'
                  onClick={(e) => handleClick(e, '/profile')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Back
                </MotionButton>
                <MotionButton
                  isFullWidth
                  variant='solid'
                  colorScheme='teal'
                  rightIcon={<MdSend />}
                  fontSize='xl'
                  isLoading={isLoading}
                  loadingText='Saving'
                  onClick={(e) => handleSubmit(e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Submit
                </MotionButton>
              </div>
            </div>
            {/* <!-- End of about section --> */}

            <div className='my-4'></div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default UsersProfileEditComponent;
