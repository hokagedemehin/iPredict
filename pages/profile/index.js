// import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import NoUserEmptyComponent from '../../components/emptypages/nouser.empty';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import ProfilePageComponent from '../../components/profile/users.component';
import { useUser } from '../../utils/auth/userContext';
// import NavHeader from "../../components/nav/header.component original";

const UserProfilePage = () => {
  const router = useRouter();
  const { user, userDoc } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <Layout name='profile' desc='I-Predict User Profile'>
      <NavHeader />
      <div className='mx-4'>
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
