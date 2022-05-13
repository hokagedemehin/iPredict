import React, { useEffect } from 'react';
import RegisterComponent from '../../components/register/register.component';
// import Layout from "../../components/layout/layout";
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/userContext';
import Layout from '../../components/layout/layout';
// import { useUser } from "../../services/context/userContext";

const RegisterPage = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/');
  }, []);
  // console.log(user);
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  return (
    <Layout
      name='Register'
      desc='Every User will Register in this page to access their wallets and information'
    >
      <RegisterComponent />
    </Layout>
  );
};

export default RegisterPage;
