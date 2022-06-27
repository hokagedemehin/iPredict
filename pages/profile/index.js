// import { Heading } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import NoUserEmptyComponent from '../../components/emptypages/nouser.empty';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import ProfilePageComponent from '../../components/profile/users.component';
import { useUser } from '../../utils/auth/userContext';
// import NavHeader from "../../components/nav/header.component original";
import AOS from 'aos';
import 'aos/dist/aos.css';

const UserProfilePage = () => {
  const router = useRouter();
  const { userDoc, user } = useUser();
  // console.log(user);
  // ****************RESTORE*************************
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  useEffect(() => {
    AOS.init();
  }, []);
  // ****************RESTORE*************************
  return (
    <Layout name='profile' desc='I-Predict User Profile'>
      <NavHeader />
      <div
        data-aos='fade-up'
        data-aos-duration='1500'
        data-aos-easing='ease-out-back'
        // data-aos-delay='1000'
        className='mx-4'
      >
        <div className='text text-center my-5'>
          {/* <Heading>My Profile</Heading> */}
        </div>
        <ProfilePageComponent userDoc={userDoc} />
        {/* <NoUserEmptyComponent /> */}
      </div>
    </Layout>
  );
};

export default UserProfilePage;
