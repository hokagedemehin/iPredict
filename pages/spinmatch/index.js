import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
import { useUser } from "../../utils/auth/userContext";

const SpinMatchVirtualPage = () => {
  const router = useRouter();
  const { user } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <Layout name="spin" desc="I-Predict spin Match">
      <NavHeader />
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
          <Heading>Spin Match Virtual</Heading>
        </div>
        {/* <ContentComponent /> */}
      </div>
    </Layout>
  );
};

export default SpinMatchVirtualPage;
