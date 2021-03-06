import { Heading } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
import React from 'react';
// import NoWalletEmptyComponent from '../../components/emptypages/nowallet.empty';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import { useUser } from '../../utils/auth/userContext';
// import NavHeader from "../../components/nav/header.component original";

const TutorialPage = () => {
  // const router = useRouter();
  // const { user } = useUser();
  // console.log(user);

  // ****************RESTORE*************************
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [user]);
  // ****************RESTORE*************************
  return (
    <Layout name='tutorials' desc='I-Predict Setup tutorials'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text text-center my-5'>
          <Heading>Tutorials</Heading>
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default TutorialPage;
