import React, { useEffect } from 'react';
import LoginComponent from '../../components/login/login.components';
import Layout from '../../components/layout/layout';

import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/userContext';
// import { useUser } from "../../services/context/userContext";

const LoginPage = () => {
  const router = useRouter();
  const { user, setUserDoc } = useUser();
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/');
  }, []);
  // console.log(user);
  useEffect(() => {
    if (user) {
      router.back();
      // router.push("/");
    }
  }, [user]);

  return (
    <Layout name='Login' desc='Users can Login with thier credentials'>
      <LoginComponent setUserDoc={setUserDoc} />
    </Layout>
  );
};

export default LoginPage;
