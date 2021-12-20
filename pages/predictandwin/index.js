import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
import PredictAndWinComponent from "../../components/predictandwin/predictandwin.component";
import { useUser } from "../../utils/auth/userContext";

const PredictAndWinPage = () => {
  const { user } = useUser();
  const router = useRouter();
  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <Layout name="matches" desc="I-Predict and Win">
      <NavHeader />
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
          <Heading>Predict & Win</Heading>
        </div>
        <PredictAndWinComponent />
      </div>
    </Layout>
  );
};

export default PredictAndWinPage;
