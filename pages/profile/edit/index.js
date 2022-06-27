import React, { useEffect } from 'react';

// import { useRouter } from 'next/router';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { useUser } from '../../../utils/auth/userContext';
import UsersProfileEditComponent from '../../../components/profile/users.edit.component';
import { useRouter } from 'next/router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProfileEditPage = () => {
  const router = useRouter();
  const { user, userDoc } = useUser();
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
        className='mx-4'
      >
        <div className='text text-center my-5'></div>
        <UsersProfileEditComponent user={user} userDoc={userDoc} />
      </div>
    </Layout>
  );
};

export default ProfileEditPage;
