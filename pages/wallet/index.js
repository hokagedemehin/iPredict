import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import NoWalletEmptyComponent from '../../components/emptypages/nowallet.empty';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import WalletHomePage from '../../components/wallet/wallethome.component';
import { useUser } from '../../utils/auth/userContext';
// import NavHeader from "../../components/nav/header.component original";

const UserWalletPage = () => {
  const router = useRouter();
  const { user, userDoc, setUserDoc } = useUser();
  // console.log(user);
  // ****************RESTORE*************************
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  // ****************RESTORE*************************
  return (
    <Layout name='wallet' desc='I-Predict User Wallet'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text text-center my-5'>
          <Heading>My Wallet</Heading>
        </div>
        <WalletHomePage userDoc={userDoc} user={user} setUserDoc={setUserDoc} />
        {/* <NoWalletEmptyComponent /> */}
      </div>
    </Layout>
  );
};

export default UserWalletPage;
