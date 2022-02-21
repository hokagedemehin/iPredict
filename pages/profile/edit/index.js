import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { useUser } from '../../../utils/auth/userContext';
import UsersProfileEditComponent from '../../../components/profile/users.edit.component';

const ProfileEditPage = () => {
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
        <div className='text text-center my-5'></div>
        <UsersProfileEditComponent user={user} userDoc={userDoc} />
      </div>
    </Layout>
  );
};

export default ProfileEditPage;
