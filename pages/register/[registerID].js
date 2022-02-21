import React, { useEffect } from 'react';
// import Layout from "../../components/layout/layout";
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth/userContext';
import Layout from '../../components/layout/layout';
import RegisterReferralComponent from '../../components/register/register.referral';
// import { useUser } from "../../services/context/userContext";

const RegisterPage = () => {
  const router = useRouter();
  const { user } = useUser();
  // console.log('router.query', router.query);
  const { registerID } = router.query;
  // console.log('registerID', registerID);

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
    <Layout name='Register' desc='Register now and start earning'>
      <RegisterReferralComponent registerID={registerID} />
    </Layout>
  );
};

export default RegisterPage;
